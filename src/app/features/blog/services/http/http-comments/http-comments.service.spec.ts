import { TestBed } from '@angular/core/testing';
import { HttpCommentsService } from '@/features/blog/services/http/http-comments/http-comments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpCommentsService', () => {
  let service: HttpCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
