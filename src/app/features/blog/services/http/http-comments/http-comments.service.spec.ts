import { TestBed } from '@angular/core/testing';
import { HttpCommentsService } from './http-comments.service';


describe('HttpCommentsService', () => {
  let service: HttpCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
