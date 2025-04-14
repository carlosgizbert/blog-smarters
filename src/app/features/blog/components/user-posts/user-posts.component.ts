import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, take } from 'rxjs';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { GetUserPostsResponse } from '../../models/interfaces/http/user';
import { ContainerComponent } from '@/core/components/container/container.component';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './user-posts.component.html',
})
export class UserPostsComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly route = inject(ActivatedRoute);

  readonly userId = signal<number | null>(null);
  readonly data = signal<GetUserPostsResponse[] | null>(null);
  readonly isLoading = signal(true);
  readonly isError = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const postIdParam = params.get('userId');
      if (postIdParam) {
        this.userId.set(Number(postIdParam));
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
    this.isLoading.set(true);
    this.isError.set(false);

    this.httpPostsService
      .byUser({ userId })
      .pipe(take(1), delay(1000))
      .subscribe({
        next: (postsResponse) => {
          this.data.set(postsResponse);
          this.isLoading.set(false);
        },
        error: () => {
          this.isError.set(true);
          this.isLoading.set(false);
        },
      });
  }

}
