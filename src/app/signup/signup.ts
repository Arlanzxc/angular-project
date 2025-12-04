import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {

  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.errorMessage = '';

    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    if(this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if(this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.loading = true;

    this.auth.signup(this.email, this.password).subscribe({
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
      case 'auth/email-already-in-use': return 'Email already in use';
      case 'auth/invalid-email': return 'Invalid email';
      case 'auth/weak-password': return 'Weak password (min 6 characters)';
      default: return 'Signup error: ' + code;
    }
  }
}