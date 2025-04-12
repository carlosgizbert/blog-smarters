import { Routes } from '@angular/router';
import { blogRoutes } from '@/features/posts/blog.routes';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', children: blogRoutes },
  { path: '**', redirectTo: 'posts' }
];
