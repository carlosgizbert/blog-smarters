import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCardComponent } from './post-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { EllipsisPipe } from '@/shared/pipes/ellipsis/index.pipe';
import { of } from 'rxjs';
import { createGetPostsResponseMock } from '@/features/blog/tests/mocks/posts.mock';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostCardComponent,
        RouterLink,
        TitleCasePipe,
        EllipsisPipe,
        CommonModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({}) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    component.post = createGetPostsResponseMock();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
