import { Validators } from '@angular/forms';

export const formGroup = {
  id: [''],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(3)]],
  status: ['ACTIVE', [Validators.required]],
  role: ['COORDINATOR', [Validators.required]],
};
