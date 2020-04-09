export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  access_token: string;
  sources: string[];
}
