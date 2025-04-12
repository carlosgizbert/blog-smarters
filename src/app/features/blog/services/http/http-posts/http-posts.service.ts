import {
  GetAllPostsResponse,
  GetCommentsQuery,
  GetCommentsResponse,
  GetOnePostQuery,
  GetOnePostResponse,
} from '@/features/blog/models/interfaces/http';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpPostsService {
  private readonly baseUrl = environment.apiUrl;
  httpService = inject(HttpClient);

  all(): Observable<GetAllPostsResponse[]> {
    return this.httpService.get<GetAllPostsResponse[]>(`${this.baseUrl}/posts`);
  }

  one(query: GetOnePostQuery): Observable<GetOnePostResponse> {
    return this.httpService.get<GetOnePostResponse>(
      `${this.baseUrl}/posts/${query.postId}`
    );
  }

  commentsByPost(query: GetCommentsQuery): Observable<GetCommentsResponse[]> {
    return this.httpService.get<GetCommentsResponse[]>(
      `${this.baseUrl}/posts/${query.postId}/comments`
    );
  }
}
