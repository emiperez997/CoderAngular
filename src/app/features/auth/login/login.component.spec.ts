import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        AngularToastifyModule,
      ],
      providers: [AuthService, provideAnimationsAsync(), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService);
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Should call toastifyService.error when form is invalid', () => {
    spyOn(toastService, 'error');
    component.onSubmit();
    expect(toastService.error).toHaveBeenCalled();
  });

  // TODO: Fix this test
  // it('Should call authService.login when form is valid', () => {
  //   const spyonLogin = spyOn(authService, 'login');
  //
  //   component.loginForm.setValue({
  //     email: 'juan@gmail.com',
  //     password: '123456',
  //     role: 'admin',
  //   });
  //
  //   component.onSubmit();
  //
  //   expect(spyonLogin).toHaveBeenCalled();
  // });
});
