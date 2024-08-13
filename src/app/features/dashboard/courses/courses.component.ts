import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  standalone: true,
  imports: [TableComponent, CommonModule],
})
export class CoursesComponent {}
