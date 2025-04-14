import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListComponent } from './posts-list.component';
import { HttpPostsService } from '@/features/blog/services/http/http-posts/http-posts.service';
import { HttpUsersService } from '@/features/blog/services/http/http-users/http-users.service';
import { of } from 'rxjs';
import { createGetPostsResponseMock } from '../../tests/mocks/posts.mock';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsListComponent],
      providers: [
        {
          provide: HttpPostsService,
          useValue: {
            all: () =>
              of([
                createGetPostsResponseMock({
                  title: 'Post 1',
                }),
                createGetPostsResponseMock({
                  title: 'Post 2',
                }),
              ]),
          },
        },
        {
          provide: HttpUsersService,
          useValue: {
            one: ({ userId }: { userId: number }) =>
              of({ id: userId, name: `User ${userId}` }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle view mode when toggleView() is called', () => {
    const initialView = component.isVertical();
    component.toggleView();
    expect(component.isVertical()).toBe(!initialView);
  });

  it('should search posts correctly', async () => {
    await fixture.whenStable();

    const event = { target: { value: 'Post 1' } } as unknown as Event;
    component.search(event);
    fixture.detectChanges();

    expect(component.filteredData().length).toBe(1);
    expect(component.filteredData()[0].title).toContain('Post 1');
  });

  it('should go to next page and previous page', () => {
    const initialPage = component.currentPage();
    component.nextPage();
    expect(component.currentPage()).toBeGreaterThanOrEqual(initialPage);

    component.prevPage();
    expect(component.currentPage()).toBeLessThanOrEqual(initialPage + 1);
  });
});
