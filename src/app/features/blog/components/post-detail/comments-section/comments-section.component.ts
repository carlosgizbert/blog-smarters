import { Comment } from '@/features/blog/models/dtos/comments';
import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './comments-section.component.html',
})
export class CommentsSectionComponent {
  @Input() comments: Comment[] = [];
  @Input() isLoading = false;
  @Input() isError = false;
  @Output() submitComment = new EventEmitter<Event>();

  handleSubmit(event: Event) {
    this.submitComment.emit(event);
  }
}

