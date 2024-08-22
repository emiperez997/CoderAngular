import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { User } from '../../../../../core/services/users/models/User';
import { formGroup } from './validation';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
})
export class FormDialogComponent {
  createForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingUser?: User,
  ) {
    this.createForm = this.fb.group(formGroup);

    if (this.editingUser) {
      this.isEditing = true;
      this.createForm.patchValue(this.editingUser);

      this.createForm.get('password')?.disable();
    }
  }

  onSubmit() {
    if (!this.createForm.invalid) {
      this.matDialogRef.close(this.createForm.value);
    }
  }

  inputValid(inputName: 'email' | 'password') {
    return (
      this.createForm.get(inputName)?.valid &&
      this.createForm.get(inputName)?.touched
    );
  }

  inputInvalid(inputName: 'email' | 'password') {
    return (
      this.createForm.get(inputName)?.invalid &&
      this.createForm.get(inputName)?.touched &&
      this.createForm.get(inputName)?.dirty
    );
  }

  getError(inputName: 'email' | 'password') {
    if (!this.createForm.get(inputName)?.errors) {
      return null;
    }

    const errors = Object.keys(
      this.createForm.get(inputName)?.errors as string[],
    );

    if (errors.length === 0) {
      return null;
    }

    let message = '';

    errors.forEach((error) => {
      switch (error) {
        case 'required':
          message += 'Este campo es requerido';
          break;
        case 'minlength':
          message += 'Este campo debe tener al menos 3 caracteres';
          break;
        case 'email':
          message += 'Debe ser un correo electrónico válido';
          break;

        default:
          break;
      }
    });

    return message;
  }
}
