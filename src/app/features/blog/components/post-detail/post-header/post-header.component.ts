import { Author } from '@/features/blog/models/author';
import { Post } from '@/features/blog/models/dtos/posts';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-header.component.html',
})
export class PostHeaderComponent {
  @Input() post: Post | null = null;
  @Input() author: Author | null = null;
}

