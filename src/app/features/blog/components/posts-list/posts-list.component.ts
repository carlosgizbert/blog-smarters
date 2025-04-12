import { Component, effect, inject, signal } from '@angular/core';
import { HttpPostsService } from '../../services/http/http-posts/http-posts.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { EllipsisPipe } from '@/shared/pipes/ellipsis/index.pipe';

@Component({
  standalone: true,
  selector: 'app-posts-list',
  imports: [AsyncPipe, NgClass, EllipsisPipe],
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent {
  private readonly httpPostsService = inject(HttpPostsService);

  data$ = this.httpPostsService.all();

  dataIsEmpty = signal(false);
  isVertical = signal(false);
  isLoading = signal(true);
  isError = signal(false);

  constructor() {
    effect(() => {
      this.data$.subscribe({
        next: (res) => {
          this.dataIsEmpty.set(res.length === 0)
          this.isLoading.set(false)
        },
        error: () => {
          this.isError.set(false)
        },
      });
    });
  }

  toggleView() {
    this.isVertical.set(!this.isVertical());
  }
}
