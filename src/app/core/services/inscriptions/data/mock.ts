import { Inscription, InscriptionStatus } from '../models/Inscription';

export const mockInscriptions: Inscription[] = [
  {
    id: 1,
    courseId: 1,
    studentId: 1,
    status: InscriptionStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    courseId: 2,
    studentId: 2,
    status: InscriptionStatus.ACCEPTED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    courseId: 3,
    studentId: 3,
    status: InscriptionStatus.REJECTED,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
