import { TestBed } from '@angular/core/testing';

import { HttpPostsService } from './http-posts.service';

describe('HttpPostsService', () => {
  let service: HttpPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
