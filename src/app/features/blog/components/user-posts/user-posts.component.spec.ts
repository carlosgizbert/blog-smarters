import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { UserPostsComponent } from './user-posts.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { of, throwError } from 'rxjs';
import { createGetUserPostsResponseMock } from '@/features/blog/tests/mocks/user-posts.mock';

describe('UserPostsComponent', () => {
  let component: UserPostsComponent;
  let fixture: ComponentFixture<UserPostsComponent>;
  let mockHttpPostsService: jasmine.SpyObj<HttpPostsService>;

  beforeEach(async () => {
    mockHttpPostsService = jasmine.createSpyObj('HttpPostsService', ['byUser']);

    await TestBed.configureTestingModule({
      imports: [UserPostsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ userId: '1' })),
          },
        },
        {
          provide: HttpPostsService,
          useValue: mockHttpPostsService,
        },
      ],
    }).compileComponents();
  });

  function createComponent() {
    fixture = TestBed.createComponent(UserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', fakeAsync(() => {
    mockHttpPostsService.byUser.and.returnValue(of([]));
    createComponent();
    tick(1000);
    expect(component).toBeTruthy();
  }));

  it('should set userId from route params', fakeAsync(() => {
    mockHttpPostsService.byUser.and.returnValue(of([]));
    createComponent();
    tick(1000);
    expect(component.userId()).toBe(1);
  }));

  it('should fetch user posts and set data successfully', fakeAsync(() => {
    mockHttpPostsService.byUser.and.returnValue(
      of([
        createGetUserPostsResponseMock({ title: 'User post 1' }),
        createGetUserPostsResponseMock({ title: 'User post 2' }),
      ])
    );
    createComponent();
    tick(1000);

    expect(component.data()).toBeTruthy();
    expect(component.data()?.length).toBe(2);
    expect(component.isLoading()).toBeFalse();
    expect(component.isError()).toBeFalse();
  }));

  it('should handle empty posts and set error state', fakeAsync(() => {
    mockHttpPostsService.byUser.and.returnValue(of([]));
    createComponent();
    tick(1000);

    expect(component.data()).toBeNull();
    expect(component.isError()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  }));

  it('should handle error response and set error state', fakeAsync(() => {
    mockHttpPostsService.byUser.and.returnValue(
      throwError(() => ({ status: 404 }))
    );
    createComponent();
    tick(1000);

    expect(component.data()).toBeNull();
    expect(component.isError()).toBeTrue();
    expect(component.isLoading()).toBeFalse();
  }));
});
