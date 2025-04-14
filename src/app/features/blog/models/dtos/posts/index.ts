import { GetUserResponse } from "../../interfaces/http/user";

export class Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  author: GetUserResponse | null;

  constructor(userId: number, id: number, title: string, body: string, author: GetUserResponse | null) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
    this.author = author;
  }
}

export class UserPost {
  userId: number;
  id: number;
  title: string;
  body: string;

  constructor(userId: number, id: number, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
}