export interface UserToken {
  email: string;
  exp: number;
  iat: number;
  sub: number;
  role: 'ADMIN' | 'COORDINATOR';
}
