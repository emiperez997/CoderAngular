import { Validators } from '@angular/forms';

export const formGroup = {
  id: [''],
  title: ['', [Validators.required, Validators.minLength(3)]],
  description: ['', [Validators.required, Validators.minLength(3)]],
  beginDate: ['', [Validators.required]],
  endDate: ['', [Validators.required]],
  teacherId: ['', [Validators.required]],
  status: ['SCHEDULED', [Validators.required]],
};
