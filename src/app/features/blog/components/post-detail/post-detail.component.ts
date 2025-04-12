import { Component, effect, inject, signal } from '@angular/core';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { ActivatedRoute } from '@angular/router';
import { GetOnePostResponse } from '../../models/interfaces/http';
import { take } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly route = inject(ActivatedRoute);

  readonly data = signal<GetOnePostResponse | null>(null);
  readonly isLoading = signal(true);
  readonly isError = signal(false);

  readonly postId = signal<number | null>(null);

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
        this.fetchPost(id);
      }
    });
  }

  private fetchPost(postId: number) {
    this.isLoading.set(true);
    this.isError.set(false);

    this.httpPostsService
      .one({ postId })
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.data.set(response);
          this.isLoading.set(false);
        },
        error: () => {
          this.isError.set(true);
          this.isLoading.set(false);
        },
      });
  }
}
