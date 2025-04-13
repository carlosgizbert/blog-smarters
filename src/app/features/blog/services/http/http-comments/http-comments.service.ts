import {
  GetCommentsQuery,
  GetCommentsResponse,
} from '@/features/blog/models/interfaces/http/posts';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCommentsService {
  private readonly baseUrl = environment.apiUrl;
  httpService = inject(HttpClient);

  getPostsComments(query: GetCommentsQuery): Observable<GetCommentsResponse[]> {
    return this.httpService.get<GetCommentsResponse[]>(
      `${this.baseUrl}/posts/${query.postId}/comments`
    );
  }
}
