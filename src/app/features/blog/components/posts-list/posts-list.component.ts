import { Component, inject, signal, effect } from '@angular/core';
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
  readonly PAGE_SIZE = 8;

  fullData = signal<GetPostsResponse[]>([]);
  filteredData = signal<GetPostsResponse[]>([]);
  currentPageData = signal<GetPostsResponse[]>([]);
  isVertical = signal(false);
  isLoading = signal(true);
  isError = signal(false);
  dataIsEmpty = signal(false);

  currentPage = signal(1);
  totalPages = signal(0);

  constructor() {
    this.fetchData();

    effect(() => {
      this.computeTotalPages();
      this.computeDataIsEmpty();
    });
  }

  computeTotalPages() {
    this.totalPages.set(
      Math.ceil(this.filteredData().length / this.PAGE_SIZE)
    )
  }

  computeDataIsEmpty() {
    this.dataIsEmpty.set(this.filteredData().length === 0);
  }

  search(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();

    if (!searchTerm) {
      this.filteredData.set(this.fullData());
      this.setPage(1);
      return;
    }

    const filteredData = this.fullData().filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.body.toLowerCase().includes(searchTerm) ||
        post.author?.name.toLowerCase().includes(searchTerm) ||
        ''
      );
    });

    this.filteredData.set(filteredData);
    this.setPage(1);
  }

  private fetchData() {
    this.httpPostsService
      .all()
      .pipe(mergeMap((posts) => this.fetchAuthorsForPosts(posts)))
      .subscribe({
        next: (postsWithAuthors) => {
          this.fullData.set(postsWithAuthors);
          this.filteredData.set(postsWithAuthors);
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

  private setPage(page: number) {
    const filtered = this.filteredData();
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;

    this.currentPageData.set(filtered.slice(start, end));
    this.currentPage.set(page);
    this.totalPages.set(Math.ceil(filtered.length / this.PAGE_SIZE));
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
