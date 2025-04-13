import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { GetPostsResponse } from '@/features/blog/models/interfaces/http/posts';
import { GetUserResponse } from '@/features/blog/models/interfaces/http/user';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly httpUsersService = inject(HttpUsersService);
  private readonly route = inject(ActivatedRoute);

  readonly postId = signal<number | null>(null);
  readonly postData = signal<GetPostsResponse | null>(null);
  readonly postIsLoading = signal(true);
  readonly postIsError = signal(false);

  readonly authorData = signal<GetUserResponse | null>(null);
  readonly authorIsLoading = signal(true);
  readonly authorIsError = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const postIdParam = params.get('postId');
      if (postIdParam) {
        this.postId.set(Number(postIdParam));
      }
    });

    effect(() => {
      const id = this.postId();
      if (id !== null) {
        this.fetchPostAndAuthor(id);
      }
    });
  }

  private fetchPostAndAuthor(postId: number) {
    this.postIsLoading.set(true);
    this.postIsError.set(false);

    this.httpPostsService
      .one({ postId })
      .pipe(take(1))
      .subscribe({
        next: (postResponse) => {
          this.postData.set(postResponse);
          this.postIsLoading.set(false);
          this.fetchAuthor(postResponse.userId);
        },
        error: () => {
          this.postIsError.set(true);
          this.postIsLoading.set(false);
        },
      });
  }

  private fetchAuthor(userId: number) {
    this.authorIsLoading.set(true);
    this.authorIsError.set(false);

    this.httpUsersService
      .one({ userId })
      .pipe(take(1))
      .subscribe({
        next: (userResponse) => {
          this.authorData.set(userResponse);
          this.authorIsLoading.set(false);
        },
        error: () => {
          this.authorIsError.set(true);
          this.authorIsLoading.set(false);
        },
      });
  }
}
