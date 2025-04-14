import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, take } from 'rxjs';

import { ContainerComponent } from '@/core/components/container/container.component';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { HttpCommentsService } from '@/features/blog/services/http/http-comments/http-comments.service';

import { Post } from '@/features/blog/models/dtos/posts';
import { Author } from '@/features/blog/models/author';
import { Comment } from '@/features/blog/models/dtos/comments';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  templateUrl: './post-detail.component.html',
  imports: [ContainerComponent, TitleCasePipe],
})
export class PostDetailComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly httpUsersService = inject(HttpUsersService);
  private readonly httpCommentsService = inject(HttpCommentsService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  readonly postId = signal<number | null>(null);
  readonly postData = signal<Post | null>(null);
  readonly postIsLoading = signal(true);
  readonly postIsError = signal(false);

  readonly authorData = signal<Author | null>(null);
  readonly authorIsLoading = signal(true);
  readonly authorIsError = signal(false);

  readonly commentsData = signal<Comment[]>([]);
  readonly commentsIsLoading = signal(true);
  readonly commentsIsError = signal(false);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const postIdParam = params.get('postId');
      if (postIdParam) {
        const postId = Number(postIdParam);
        if (isNaN(postId) || postId <= 0) {
          this.handleError('Post não encontrado');
        } else {
          this.postId.set(postId);
        }
      } else {
        this.handleError('Post não encontrado');
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
      .pipe(take(1), delay(1000))
      .subscribe({
        next: (postResponse) => {
          this.postData.set(postResponse);
          this.postIsLoading.set(false);
          this.fetchAuthor(postResponse.userId);
          this.fetchComments(postResponse.id);
        },
        error: () => {
          this.handleError('Erro ao carregar o post');
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
          this.handleError('Erro ao carregar o autor');
        },
      });
  }

  private handleError(message: string) {
    this.postIsError.set(true);
    this.authorIsError.set(true);
    this.commentsIsError.set(true);
    this.postIsLoading.set(false);
    this.authorIsLoading.set(false);
    this.commentsIsLoading.set(false);
    alert(message);
    this.router.navigate(['/']);
  }

  submitComment(event: Event) {}
}
