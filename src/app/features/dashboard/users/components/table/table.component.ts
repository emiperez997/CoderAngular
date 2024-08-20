import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../../../core/services/users/users.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StatusDirective } from '../../../../../shared/directives/status.directive';
import { FullNamePipe } from '../../../../../shared/pipes/full-name.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import {
  teacherColumns,
  Teacher,
} from '../../../../../core/services/teachers/models/Teacher';
import {
  User,
  userColumns,
} from '../../../../../core/services/users/models/User';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { Observable } from 'rxjs';
import {
  selectUsers,
  selectIsLoading,
  selectError,
} from '../../store/users.selectors';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-users-table',
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
    RouterLink,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() createButton: boolean = true;

  displayedColumns: string[] = userColumns;
  dataSource!: MatTableDataSource<User>;
  skeletonRows: any[] = Array(5).fill({});

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  users$: Observable<User[]>;
  isLoading$: Observable<boolean>;
  isError$: Observable<unknown>;

  constructor(
    private store: Store<RootState>,
    private toastService: ToastService,
  ) {
    this.users$ = this.store.select(selectUsers);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.isError$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      console.log(users);

      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.isError$.subscribe((error) => {
      if (error) {
        const errorMessage = error as any;

        this.toastService.error(errorMessage.error.message);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
