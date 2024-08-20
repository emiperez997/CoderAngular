import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FullNamePipe } from '../../../../../shared/pipes/full-name.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { StatusDirective } from '../../../../../shared/directives/status.directive';

import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { InscriptionsService } from '../../../../../core/services/inscriptions/inscriptions.service';
import {
  Inscription,
  inscriptionColumns,
} from '../../../../../core/services/inscriptions/models/Inscription';
import { FormDialogComponent } from '../form/form.component';
import { ToastService } from 'angular-toastify';
import { getErrorMessage } from '../../../../../shared/utils/errorMessages';
import { RootState } from '../../../../../core/store';
import { Store, provideState } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  selectInscriptions,
  selectIsLoading,
} from '../../store/inscriptions.selectors';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { inscriptionsFeature } from '../../store/inscriptions.reducer';

@Component({
  selector: 'app-inscriptions-table',
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
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() createButton: boolean = true;
  @Input() id?: number;
  @Input() type?: 'course' | 'student';

  @Input() inscriptions: Inscription[] = [];

  displayedColumns: string[] = inscriptionColumns;
  dataSource!: MatTableDataSource<Inscription>;
  skeletonRows: any[] = Array(5).fill({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  inscriptions$: Observable<Inscription[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private store: Store<RootState>,
  ) {
    this.inscriptions$ = this.store.select(selectInscriptions);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit() {
    this.inscriptions$.subscribe((inscriptions) => {
      if (this.id) {
        switch (this.type) {
          case 'course':
            inscriptions = inscriptions.filter(
              (inscription) => inscription.courseId === this.id,
            );
            break;
          case 'student':
            inscriptions = inscriptions.filter(
              (inscription) => inscription.studentId === this.id,
            );
            break;
        }
      }

      console.log(inscriptions);

      this.dataSource = new MatTableDataSource(inscriptions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
        next: (inscription) => {
          if (!!inscription) {
            this.store.dispatch(
              InscriptionsActions.createInscription({ inscription }),
            );
          }
        },
      });
  }

  editInscription(inscription: Inscription) {
    this.dialog
      .open(FormDialogComponent, {
        data: inscription,
      })
      .afterClosed()
      .subscribe({
        next: (inscription) => {
          if (!!inscription) {
            this.store.dispatch(
              InscriptionsActions.updateInscription({ inscription }),
            );
          }
        },
      });
  }

  deleteInscription(id: number) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar Eliminación',
          message: '¿Está seguro de eliminar este alumno?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.store.dispatch(InscriptionsActions.deleteInscription({ id }));
          }
        },
      });
  }
}
