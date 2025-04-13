import { GetUserResponse } from "./user";

export interface GetOnePostQuery {
  postId: number;
}

export interface GetPostsResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
  author: GetUserResponse | null
}

export interface GetCommentsQuery {
  postId: number;
}

export interface GetCommentsResponse {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}