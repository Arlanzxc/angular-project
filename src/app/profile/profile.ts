import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styles: [`
    .profile-container { max-width: 500px; margin: 50px auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px; }
    .avatar { font-size: 60px; margin-bottom: 10px; }
    button { background: #d32f2f; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;}
  `]
})
export class ProfileComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(Router);
  
  currentUser = signal<any>(null);

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.currentUser.set(user);
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}