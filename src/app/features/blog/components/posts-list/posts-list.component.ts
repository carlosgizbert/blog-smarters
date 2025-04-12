import { Component, inject } from '@angular/core';
import { HttpPostsService } from '../../services/http/http-posts/http-posts.service';
import { AsyncPipe  } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-posts-list',
  imports: [AsyncPipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {
  httpPostsService = inject(HttpPostsService);
  data$ = this.httpPostsService.all()
}
