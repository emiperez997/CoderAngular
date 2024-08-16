import { Validators } from '@angular/forms';

export const formGroup = {
  id: [''],
  courseId: ['', Validators.required],
  studentId: ['', Validators.required],
  status: ['PENDING', Validators.required],
};
