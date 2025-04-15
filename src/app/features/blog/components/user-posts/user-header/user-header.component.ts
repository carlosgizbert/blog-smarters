import { Component, Input } from '@angular/core';
import { GetUserResponse } from '@/features/blog/models/interfaces/http/user';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
})
export class UserHeaderComponent {
  @Input() userData: GetUserResponse | null = null;
  @Input() isLoading: boolean = true;
}
