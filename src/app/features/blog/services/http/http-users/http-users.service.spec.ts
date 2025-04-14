import { TestBed } from '@angular/core/testing';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpUsersService', () => {
  let service: HttpUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
