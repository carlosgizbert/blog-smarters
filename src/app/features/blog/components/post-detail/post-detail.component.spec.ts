import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { HttpCommentsService } from '@/features/blog/services/http/http-comments/http-comments.service';
import { of } from 'rxjs';
import { createGetUserResponseMock } from '@/features/blog/tests/mocks/user.mock';
import { createGetPostsResponseMock } from '../../tests/mocks/posts.mock';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PostDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ postId: '1' })),
          },
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: HttpPostsService,
          useValue: {
            one: () => of(createGetPostsResponseMock()),
          },
        },
        {
          provide: HttpUsersService,
          useValue: {
            one: () =>
              of(
                createGetUserResponseMock({
                  name: 'Usuario 1',
                })
              ),
          },
        },
        {
          provide: HttpCommentsService,
          useValue: {
            getPostsComments: () => of([]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to another path when navigate() is called', () => {
    component.navigate('/home');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
