import { Student } from '../../students/models/Student';
import { Teacher } from '../../teachers/models/Teacher';

export interface Course {
  id: number;
  title: string;
  description: string;
  beginDate: Date;
  endDate: Date;
  teacher?: Teacher;
  teacherId: number;
  students?: Student[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
