import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { HttpCommentsService } from '@/features/blog/services//http/http-comments/http-comments.service';
import {
  GetCommentsResponse,
  GetPostsResponse,
} from '@/features/blog/models/interfaces/http/posts';
import { GetUserResponse } from '@/features/blog/models/interfaces/http/user';
import { ContainerComponent } from "../../../../core/components/container/container.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  templateUrl: './post-detail.component.html',
  imports: [ContainerComponent, ContainerComponent],
})
export class PostDetailComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly httpUsersService = inject(HttpUsersService);
  private readonly httpCommentsService = inject(HttpCommentsService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  readonly postId = signal<number | null>(null);
  readonly postData = signal<GetPostsResponse | null>(null);
  readonly postIsLoading = signal(true);
  readonly postIsError = signal(false);

  readonly authorData = signal<GetUserResponse | null>(null);
  readonly authorIsLoading = signal(true);
  readonly authorIsError = signal(false);

  readonly commentsData = signal<GetCommentsResponse[]>([]);
  readonly commentsIsLoading = signal(true);
  readonly commentsIsError = signal(false);

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

  navigate(path: string) {
    this.router.navigate([path]);
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
          this.fetchComments(postResponse.id);
        },
        error: () => {
          this.postIsError.set(true);
          this.postIsLoading.set(false);
        },
      });
  }

  private fetchComments(postId: number) {
    this.commentsIsLoading.set(true);
    this.commentsIsError.set(false);

    this.httpCommentsService
      .getPostsComments({ postId })
      .pipe(take(1))
      .subscribe({
        next: (commentsResponse) => {
          this.commentsData.set(commentsResponse);
          this.commentsIsLoading.set(false);
        },
        error: () => {
          this.commentsIsError.set(true);
          this.commentsIsLoading.set(false);
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

  submitComment(event: Event) {}
}
