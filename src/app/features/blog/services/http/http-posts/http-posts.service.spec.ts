import { TestBed } from '@angular/core/testing';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpPostsService', () => {
  let service: HttpPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
