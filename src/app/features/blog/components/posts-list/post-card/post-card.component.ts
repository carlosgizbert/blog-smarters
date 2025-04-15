import { Post } from '@/features/blog/models/dtos/posts';
import { EllipsisPipe } from '@/shared/pipes/ellipsis/index.pipe';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [RouterLink, TitleCasePipe, EllipsisPipe, CommonModule],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() vertical: boolean = false;
}
