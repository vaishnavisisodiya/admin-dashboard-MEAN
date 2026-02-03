import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <aside class="sidebar">
        <div class="sidebar-header"><div class="logo"><span class="logo-text">Dashboard</span></div></div>
        <nav class="sidebar-nav">
          <a routerLink="/dashboard" class="nav-item">Overview</a>
          <a routerLink="/analytics" routerLinkActive="active" class="nav-item">Analytics</a>
          <a *ngIf="authService.isAdmin()" routerLink="/users" class="nav-item">Users</a>
        </nav>
        <div class="sidebar-footer"><button (click)="logout()" class="btn-logout">Logout</button></div>
      </aside>
      <main class="main-content">
        <h1>Advanced Analytics</h1>
        <div class="card"><p>Detailed analytics and reporting features</p></div>
      </main>
    </div>
  `,
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class AnalyticsComponent {
  constructor(public authService: AuthService, private router: Router) {}
  logout() { this.authService.logout(); this.router.navigate(['/login']); }
}
