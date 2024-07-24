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

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<FormDialogComponent>,
    private inscriptionsService: InscriptionsService,
    private studentService: StudentsService,
    private courseService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public editingInscription?: Inscription,
  ) {
    this.createForm = this.fb.group({
      courseId: ['', Validators.required],
      studentId: ['', Validators.required],
      status: ['PENDING', Validators.required],
    });

    if (this.editingInscription) {
      this.isEditing = true;
      this.createForm.patchValue(this.editingInscription);
    }
  }

  ngOnInit() {
    this.courseService.getCourses().subscribe((courses) => {
      this.createForm.get('courseId')?.setValue(courses[0].id);
      this.courses = courses;
    });

    this.studentService.getStudents().subscribe((students) => {
      this.createForm.get('studentId')?.setValue(students[0].id);
      this.students = students;
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
    console.log(this.createForm);

    console.log(this.createForm.errors);

    if (!this.createForm.invalid) {
      this.matDialogRef.close(this.createForm.value);
    }
  }
}
