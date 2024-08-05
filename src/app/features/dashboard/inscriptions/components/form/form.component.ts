import { MatFormFieldModule } from '@angular/material/form-field';
import { InscriptionsService } from '../../../../../core/services/inscriptions/inscriptions.service';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentsService } from '../../../../../core/services/students/student.service';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../../../../core/services/courses/models/Course';
import { Student } from '../../../../../core/services/students/models/Student';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Inscription } from '../../../../../core/services/inscriptions/models/Inscription';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { formGroup } from './validation';

@Component({
  selector: 'app-inscriptions-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [InscriptionsService, StudentsService, CoursesService],
})
export class FormDialogComponent implements OnInit {
  createForm: FormGroup;
  courses: Course[] = [];
  students: Student[] = [];
  isEditing: boolean = false;
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<FormDialogComponent>,
    private studentService: StudentsService,
    private courseService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public editingInscription?: Inscription,
  ) {
    this.createForm = this.fb.group(formGroup);

    if (this.editingInscription) {
      this.isEditing = true;
      this.createForm.patchValue(this.editingInscription);
    }
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      if (!this.editingInscription) {
        this.createForm.get('courseId')?.setValue(courses[0].id);
        this.courses = courses;
      } else {
        const course = courses.find(
          (c) => c.id === this.editingInscription?.courseId,
        );

        if (course) {
          this.createForm.get('courseId')?.setValue(course.id);
          this.courses = [course];
        }
      }

      this.isLoading = false;
    });

    this.studentService.getStudents().subscribe((students) => {
      if (!this.editingInscription) {
        this.createForm.get('studentId')?.setValue(students[0].id);
        this.students = students;
      } else {
        const student = students.find(
          (s) => s.id === this.editingInscription?.studentId,
        );

        if (student) {
          this.createForm.get('studentId')?.setValue(student.id);
          this.students = [student];
        }
      }

      this.isLoading = false;
    });
  }

  inputValid(inputName: 'courseId' | 'studentId' | 'status') {
    return (
      this.createForm.get(inputName)?.valid &&
      this.createForm.get(inputName)?.touched
    );
  }

  inputInvalid(inputName: 'courseId' | 'studentId' | 'status') {
    return (
      this.createForm.get(inputName)?.invalid &&
      this.createForm.get(inputName)?.touched &&
      this.createForm.get(inputName)?.dirty
    );
  }

  onSubmit(): void {
    if (!this.createForm.invalid) {
      this.matDialogRef.close(this.createForm.value);
    }
  }
}
