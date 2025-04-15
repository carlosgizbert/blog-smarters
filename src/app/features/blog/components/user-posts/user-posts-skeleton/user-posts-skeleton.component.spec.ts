import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsSkeletonComponent } from './user-posts-skeleton.component';

describe('UserPostsSkeletonComponent', () => {
  let component: UserPostsSkeletonComponent;
  let fixture: ComponentFixture<UserPostsSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPostsSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostsSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
