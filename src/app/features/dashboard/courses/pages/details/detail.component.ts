import { Component } from '@angular/core';
import { Course } from '../../../../../core/services/courses/models/Course';
import { CoursesService } from '../../../../../core/services/courses/courses.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  ],
})
export class DetailComponent {
  course?: Course;
  loading = true;

  constructor(
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute,
  ) {
    const id = this.activatedRoute.snapshot.params['id'];

    this.courseService.getCourse(Number(id)).subscribe((course) => {
      console.log(course);

      this.course = course;
      this.loading = false;
    });
  }
}
