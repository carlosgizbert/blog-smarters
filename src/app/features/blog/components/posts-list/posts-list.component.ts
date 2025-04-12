import { Component, inject } from '@angular/core';
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
  httpPostsService = inject(HttpPostsService);
  data$ = this.httpPostsService.all();

  isVertical = false;

  toggleView() {
    this.isVertical = !this.isVertical;
  }
}
