import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  loading = true;
  error = '';
  
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }
  
  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
          alert('User deleted successfully');
        },
        error: (err) => {
          alert('Failed to delete user');
        }
      });
    }
  }
  
  toggleUserStatus(user: any) {
    this.userService.updateUser(user._id, {
      isActive: !user.isActive
    }).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        alert('Failed to update user status');
      }
    });
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
