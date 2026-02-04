import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  isRegisterMode: boolean = false;
  name: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.isRegisterMode) {
      this.register();
    } else {
      this.login();
    }
  }

  login(): void {
    this.error = '';
    this.loading = true;

    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      this.loading = false;
      return;
    }

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.error = response.message || 'Login failed';
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Login failed. Please check your credentials.';
          this.loading = false;
        }
      });
  }

  register(): void {
    this.error = '';
    this.loading = true;

    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill all fields';
      this.loading = false;
      return;
    }

    this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = response.message || 'Registration failed';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.error = '';
    this.name = '';
    this.email = '';
    this.password = '';
  }

  fillDemoCredentials(): void {
    this.email = 'admin@admin.com';
    this.password = 'admin123';
  }
}
