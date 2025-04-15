import { Component, inject, signal, effect } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { EllipsisPipe } from '@/shared/pipes/ellipsis/index.pipe';

import { ContainerComponent } from '@/core/components/container/container.component';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { GetPostsResponse } from '@/features/blog/models/interfaces/http/posts';
import { Post } from '@/features/blog/models/dtos/posts';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-posts-list',
  imports: [
    ContainerComponent,
    ContainerComponent,
    EllipsisPipe,
    NgClass,
    RouterLink,
    TitleCasePipe,
  ],
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent {
  private readonly httpPostsService = inject(HttpPostsService);
  private readonly httpUsersService = inject(HttpUsersService);
  readonly PAGE_SIZE = 6;

  fullData = signal<Post[]>([]);
  filteredData = signal<Post[]>([]);
  currentPageData = signal<Post[]>([]);
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
    this.totalPages.set(Math.ceil(this.filteredData().length / this.PAGE_SIZE));
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
      .pipe(
        mergeMap((posts) => this.fetchAuthorsForPosts(posts)),
        delay(1000)
      )
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
