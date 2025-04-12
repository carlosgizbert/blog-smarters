export interface GetAllPostsResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface GetOnePostQuery {
  postId: number;
}

export interface GetOnePostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
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
