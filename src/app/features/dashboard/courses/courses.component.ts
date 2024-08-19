import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store';
import { CoursesActions } from './store/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  constructor(private store: Store<RootState>) {}

  ngOnInit() {
    this.store.dispatch(CoursesActions.loadCourses());
  }
}
