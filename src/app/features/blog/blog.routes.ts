import { Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

export const blogRoutes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'user/:userId', component: UserPostsComponent },
  { path: ':postId', component: PostDetailComponent },
];

