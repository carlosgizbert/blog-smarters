import { Component, inject, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { EllipsisPipe } from '@/shared/pipes/ellipsis/index.pipe';
import { GetPostsResponse } from '@/features/blog/models/interfaces/http/posts';

@Component({
  standalone: true,
  selector: 'app-posts-list',
  imports: [NgClass, EllipsisPipe],
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly httpUsersService = inject(HttpUsersService);

  fullData = signal<GetPostsResponse[]>([]);
  currentPageData = signal<GetPostsResponse[]>([]);
  isVertical = signal(false);
  isLoading = signal(true);
  isError = signal(false);
  dataIsEmpty = computed(() => this.fullData().length === 0);

  readonly PAGE_SIZE = 8;
  currentPage = signal(1);
  totalPages = computed(() =>
    Math.ceil(this.fullData().length / this.PAGE_SIZE)
  );

  constructor() {
    this.fetchData();
  }

  private fetchData() {
    this.httpPostsService
      .all()
      .pipe(mergeMap((posts) => this.fetchAuthorsForPosts(posts)))
      .subscribe({
        next: (postsWithAuthors) => {
          this.fullData.set(postsWithAuthors);
          this.setPage(1);
          this.isLoading.set(false);
        },
        error: () => {
          this.isError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  private fetchAuthorsForPosts(posts: GetPostsResponse[]) {
    const authorRequests = posts.map((post) =>
      this.httpUsersService
        .one({ userId: post.userId })
        .pipe(map((userResponse) => ({ ...post, author: userResponse })))
    );
    return forkJoin(authorRequests);
  }

  setPage(page: number) {
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    this.currentPageData.set(this.fullData().slice(start, end));
    this.currentPage.set(page);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.setPage(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.setPage(this.currentPage() - 1);
    }
  }

  toggleView() {
    this.isVertical.set(!this.isVertical());
  }
}
