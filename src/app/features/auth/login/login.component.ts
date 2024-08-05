import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
  providers: [AuthService, ThemeService],
})
export class LoginComponent {
  loginForm: FormGroup;
  theme: string | null;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['admin', [Validators.required]],
    });
    this.theme = this.themeService.getTheme();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return this.toastService.error('Formulario no válido');
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.loginForm.disable();
        this.toastService.success('Sesión iniciada');
        this.authService.setToken(response.token);

        setTimeout(() => {
          this.router.navigate(['/dashboard']).then(() => {
            this.location.replaceState('/dashboard');
          });
        }, 1000);
      },
      error: (error) => {
        this.toastService.error(error.error.message);
      },
    });
  }

  toggleTheme() {
    this.themeService.setTheme(
      this.themeService.getTheme() === 'dark' ? 'light' : 'dark',
    );
    this.theme = this.themeService.getTheme();
  }

  getTheme() {
    return this.themeService.getTheme();
  }
}
