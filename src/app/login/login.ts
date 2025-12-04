import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(err.code);
      }
    });
  }

  getErrorMessage(code: string): string {
    switch(code) {
      case 'auth/user-not-found': return 'User not found';
      case 'auth/wrong-password': return 'Invalid password';
      case 'auth/invalid-email': return 'Invalid email';
      case 'auth/invalid-credential': return 'Invalid email or password';
      default: return 'Login error';
    }
  }
}