import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './post-content.component.html',
})
export class PostContentComponent {
  @Input() body: any = null;
}

