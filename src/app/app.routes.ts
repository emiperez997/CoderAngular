import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { StudentsComponent } from './pages/main/students/students.component';
import { TeachersComponent } from './pages/main/teachers/teachers.component';
import { HomeComponent } from './pages/main/home/home.component';
import { CoursesComponent } from './pages/main/courses/courses.component';
import { InscriptionsComponent } from './pages/main/inscriptions/inscriptions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'inscriptions',
        component: InscriptionsComponent,
      },
      {
        path: 'teachers',
        component: TeachersComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
