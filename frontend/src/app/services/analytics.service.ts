import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'http://localhost:3000/api/analytics';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getSalesData(period: number = 30): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales?period=${period}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getUserData(period: number = 90): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?period=${period}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getRevenueData(period: number = 30): Observable<any> {
    return this.http.get(`${this.apiUrl}/revenue?period=${period}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getMonthlyData(months: number = 12): Observable<any> {
    return this.http.get(`${this.apiUrl}/monthly?months=${months}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
