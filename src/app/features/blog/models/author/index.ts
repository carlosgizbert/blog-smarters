import { Address } from '../interfaces/http/user';

export class Author {
  id: number;
  name: string;
  email: string;
  address: Address;
  website: string;

  constructor(
    id: number,
    name: string,
    email: string,
    address: Address,
    website: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.website = website;
  }
}
