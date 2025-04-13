import { GetOneUserQuery, GetUserResponse } from '@/features/blog/models/interfaces/http/user';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpUsersService {
  private readonly baseUrl = environment.apiUrl;
  httpService = inject(HttpClient);

  one(query: GetOneUserQuery): Observable<GetUserResponse> {
    return this.httpService.get<GetUserResponse>(
      `${this.baseUrl}/users/${query.userId}`
    );
  }

}
