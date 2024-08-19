import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../../core/services/courses/models/Course';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { StatusDirective } from '../../../../../shared/directives/status.directive';
import { InscriptionsComponent } from '../../../inscriptions/inscriptions.component';
import { TableComponent as InscriptionsTableComponent } from '../../../inscriptions/components/table/table.component';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { InscriptionsActions } from '../../../inscriptions/store/inscriptions.actions';
import { selectCourse, selectIsLoading } from '../../store/courses.selectors';
import { Observable } from 'rxjs';
import { CoursesActions } from '../../store/courses.actions';
import { selectIsLoading as inscriptinsLoading } from '../../../inscriptions/store/inscriptions.selectors';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    StatusPipe,
    StatusDirective,
    InscriptionsTableComponent,
  ],
})
export class DetailComponent implements OnInit {
  course$: Observable<Course | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<RootState>,
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.course$ = this.store.select(selectCourse);
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.store.dispatch(CoursesActions.loadCourse({ id: Number(id) }));
    this.store.dispatch(InscriptionsActions.loadInscriptions());
  }
}
