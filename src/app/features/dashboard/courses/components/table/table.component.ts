import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StatusDirective } from '../../../../../shared/directives/status.directive';
import { FullNamePipe } from '../../../../../shared/pipes/full-name.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import {
  Course,
  courseColumns,
} from '../../../../../core/services/courses/models/Course';
import { CoursesService } from '../../../../../core/services/courses/courses.service';

import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { CoursesActions } from '../../store/courses.actions';
import { Observable } from 'rxjs';
import {
  selectCourses,
  selectError,
  selectIsLoading,
} from '../../store/courses.selectors';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FullNamePipe,
    StatusPipe,
    StatusDirective,
    NgxSkeletonLoaderModule,
    RouterLink,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() createButton: boolean = true;
  @Input() id?: number;
  @Input() type?: 'teacher' | 'student';

  displayedColumns: string[] = courseColumns;
  dataSource!: MatTableDataSource<Course>;
  skeletonRows: any[] = Array(5).fill({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  isError$: Observable<unknown>;

  constructor(
    private toastService: ToastService,
    private dialog: MatDialog,
    private store: Store<RootState>,
  ) {
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isError$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(CoursesActions.loadCourses());

    this.courses$.subscribe((courses) => {
      if (this.id) {
        switch (this.type) {
          case 'teacher':
            courses = courses.filter((course) => course.teacherId === this.id);
            break;
          case 'student':
            break;
        }
      }

      this.dataSource = new MatTableDataSource(courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.isError$.subscribe((error) => {
      if (error) {
        const errorMessage = error as any;

        this.toastService.error(errorMessage.error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm() {
    this.dialog
      .open(FormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (course) => {
          if (!!course) {
            this.store.dispatch(CoursesActions.createCourse({ course }));
          }
        },
      });
  }

  editCourse(course: Course) {
    this.dialog
      .open(FormDialogComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (course) => {
          if (!!course) {
            this.store.dispatch(CoursesActions.updateCourse({ course }));
          }
        },
      });
  }

  deleteCourse(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar Eliminación',
          message: '¿Está seguro de eliminar este curso?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.store.dispatch(CoursesActions.deleteCourse({ id }));
          }
        },
      });
  }
}
