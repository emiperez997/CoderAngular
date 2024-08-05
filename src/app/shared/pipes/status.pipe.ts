import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string {
    switch (value) {
      case 'ACTIVE':
        return 'Activo';
      case 'INACTIVE':
        return 'Inactivo';
      case 'PENDING':
        return 'Pendiente';
      case 'CONFIRMED':
        return 'Confirmado';
      case 'REJECTED':
        return 'Rechazado';
      case 'SCHEDULED':
        return 'Programado';
      case 'ACCEPTED':
        return 'Aceptado';
      default:
        return 'default';
    }
  }
}
