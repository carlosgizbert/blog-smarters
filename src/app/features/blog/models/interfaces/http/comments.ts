export interface GetCommentsQuery {
  postId: number;
}

export interface GetCommentsResponse {
  postId: number
  id: number
  name: string
  email: string
  body: string
}