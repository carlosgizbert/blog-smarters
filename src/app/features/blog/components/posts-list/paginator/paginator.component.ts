import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() current = 1;
  @Input() total = 1;
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}
