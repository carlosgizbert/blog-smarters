import {
  GetPostsResponse,
  GetCommentsQuery,
  GetCommentsResponse,
  GetOnePostQuery,
} from '@/features/blog/models/interfaces/http/posts';
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

  all(): Observable<GetPostsResponse[]> {
    return this.httpService.get<GetPostsResponse[]>(`${this.baseUrl}/posts`);
  }

  one(query: GetOnePostQuery): Observable<GetPostsResponse> {
    return this.httpService.get<GetPostsResponse>(
      `${this.baseUrl}/posts/${query.postId}`
    );
  }

  commentsByPost(query: GetCommentsQuery): Observable<GetCommentsResponse[]> {
    return this.httpService.get<GetCommentsResponse[]>(
      `${this.baseUrl}/posts/${query.postId}/comments`
    );
  }
}
