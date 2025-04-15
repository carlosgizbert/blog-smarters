import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPostDetailComponent } from './skeleton-post-detail.component';

describe('SkeletonPostDetailComponent', () => {
  let component: SkeletonPostDetailComponent;
  let fixture: ComponentFixture<SkeletonPostDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonPostDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
