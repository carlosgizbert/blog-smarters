import { Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const blogRoutes: Routes = [
  { path: '', component: PostsListComponent },
  { path: ':id', component: PostDetailComponent },
];
