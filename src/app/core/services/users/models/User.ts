import { Status } from '../../../../shared/models/status';

export interface User {
  id: number;
  email: string;
  password?: string;
  status: Status;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Role {
  ADMIN = 'admin',
  COORDINATOR = 'coordinator',
}

export const userColumns: string[] = [
  'id',
  'email',
  'status',
  'role',
  'createdAt',
  'updatedAt',
  'actions',
];
