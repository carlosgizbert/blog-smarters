import { TitleCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, take } from 'rxjs';

import { ContainerComponent } from '@/core/components/container/container.component';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { UserPost } from '@/features/blog/models/dtos/posts';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [TitleCasePipe, ContainerComponent],
  templateUrl: './user-posts.component.html',
})
export class UserPostsComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly route = inject(ActivatedRoute);

  readonly userId = signal<number | null>(null);
  readonly data = signal<UserPost[] | null>(null);
  readonly isLoading = signal(true);
  readonly isError = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('userId');
      if (userIdParam) {
        this.userId.set(Number(userIdParam));
      }
    });

    effect(() => {
      const id = this.userId();
      if (id !== null) {
        this.fetchUserPosts(id);
      }
    });
  }

  private fetchUserPosts(userId: number) {
    this.startLoading();

    this.httpPostsService
      .byUser({ userId })
      .pipe(take(1), delay(1000))
      .subscribe({
        next: (posts) => this.handleSuccess(posts),
        error: (error) => this.handleError(error),
      });
  }

  private startLoading() {
    this.isLoading.set(true);
    this.isError.set(false);
  }

  private handleSuccess(posts: UserPost[]) {
    if (!posts.length) {
      this.handleError({ status: 404 });
      return;
    }

    this.data.set(posts);
    this.isLoading.set(false);
  }

  private handleError(error: { status?: number }) {
    this.isError.set(true);
    this.isLoading.set(false);
  }
}
