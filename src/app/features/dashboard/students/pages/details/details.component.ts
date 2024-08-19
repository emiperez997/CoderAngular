import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StatusDirective } from '../../../../../shared/directives/status.directive';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';

import { Student } from '../../../../../core/services/students/models/Student';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { StudentsActions } from '../../store/students.actions';
import { selectStudent, selectIsLoading } from '../../store/students.selectors';
import { Observable } from 'rxjs';
import { TableComponent } from '../../../courses/components/table/table.component';
import { CoursesActions } from '../../../courses/store/courses.actions';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    StatusPipe,
    StatusDirective,
    TableComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  student$: Observable<Student | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<RootState>,
  ) {
    this.student$ = this.store.select(selectStudent);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.store.dispatch(StudentsActions.loadStudent({ id: Number(id) }));
    this.store.dispatch(CoursesActions.loadCourses());
  }
}
