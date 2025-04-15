import { TitleCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, take } from 'rxjs';

import { ContainerComponent } from '@/core/components/container/container.component';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { UserPost } from '@/features/blog/models/dtos/posts';
import { GetUserResponse } from '@/features/blog/models/interfaces/http/user';
import { HttpUsersService } from '../../services/http/http-users/http-users.service';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [TitleCasePipe, ContainerComponent],
  templateUrl: './user-posts.component.html',
})
export class UserPostsComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly httpUsersService = inject(HttpUsersService);
  private readonly route = inject(ActivatedRoute);

  readonly userId = signal<number | null>(null);
  readonly data = signal<UserPost[] | null>(null);
  readonly userData = signal<GetUserResponse | null>(null);
  readonly authorIsLoading = signal(true);
  readonly authorIsError = signal(false);
  readonly postsIsLoading = signal(true);
  readonly postsIsError = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const userIdParam = params.get('userId');
      if (userIdParam) {
        this.userId.set(Number(userIdParam));
      }
    });

    effect(() => {
      const userId = this.userId();
      if (userId !== null) {
        this.fetchUserPosts(userId);
        this.fetchUserData(userId);
      }
    });
  }

  private fetchUserData(userId: number) {
    this.startLoading();

    this.httpUsersService
      .one({ userId })
      .pipe(take(1), delay(1000))
      .subscribe({
        next: (userResponse) => {
          this.authorIsLoading.set(false);
          this.userData.set(userResponse)
        },
        error: (error) => this.handleError(error),
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
    this.postsIsLoading.set(true);
    this.postsIsError.set(false);
  }

  private handleSuccess(posts: UserPost[]) {
    if (!posts.length) {
      this.handleError({ status: 404 });
      return;
    }

    this.data.set(posts);
    this.postsIsLoading.set(false);
  }

  private handleError(error: { status?: number }) {
    this.postsIsError.set(true);
    this.postsIsLoading.set(false);
  }
}
