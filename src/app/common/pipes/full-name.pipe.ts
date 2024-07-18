import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../pages/main/students/services/models/Student';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(value: Student, ...args: unknown[]): string {
    return `${value.firstName} ${value.lastName}`;
  }
}
