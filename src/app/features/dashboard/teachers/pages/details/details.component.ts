import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StatusDirective } from '../../../../../shared/directives/status.directive';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Teacher } from '../../../../../core/services/teachers/models/Teacher';
import { RootState } from '../../../../../core/store';
import { selectIsLoading, selectTeacher } from '../../store/teachers.selectors';
import { TeachersActions } from '../../store/teachers.actions';
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
export class DetailsComponent implements OnInit {
  teacher$: Observable<Teacher | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<RootState>,
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.teacher$ = this.store.select(selectTeacher);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.store.dispatch(TeachersActions.loadTeacher({ id: Number(id) }));
    this.store.dispatch(CoursesActions.loadCourses());
  }
}
