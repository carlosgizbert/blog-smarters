import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { HttpCommentsService } from '@/features/blog/services/http/http-comments/http-comments.service';
import { of } from 'rxjs';

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
            one: () => of({ id: 1, userId: 10, title: 'Mock title', body: 'Mock body' }),
          },
        },
        {
          provide: HttpUsersService,
          useValue: {
            one: () => of({ id: 10, name: 'Author name', username: 'author' }),
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
