export interface GetOneUserQuery {
  userId: number;
}

export interface GetUserResponse {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface GetUserPostsQuery {
  userId: number;
}

export interface GetUserPostsResponse {
  userId: number
  id: number
  title: string
  body: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}