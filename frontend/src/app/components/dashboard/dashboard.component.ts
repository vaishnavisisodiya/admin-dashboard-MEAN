import { Component, OnInit, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Chart, registerables } from "chart.js";
import { AuthService } from "../../services/auth.service";
import { AnalyticsService } from "../../services/analytics.service";
import { DashboardStats } from "../../models/analytics.model";

Chart.register(...registerables);

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  currentUser: any;
  dashboardStats: DashboardStats | null = null;
  loading: boolean = true;
  error: string = "";

  // Charts
  salesChart: Chart | null = null;
  userGrowthChart: Chart | null = null;

  constructor(
    public authService: AuthService,
    private analyticsService: AnalyticsService,
    private router: Router,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    // Charts will be initialized after data is loaded
  }

  loadDashboardData(): void {
    this.loading = true;
    this.analyticsService.getDashboardStats().subscribe({
      next: (response) => {
        if (response.success) {
          this.dashboardStats = response.data;
          setTimeout(() => this.initializeCharts(), 100);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load dashboard data";
        console.error(err);
        this.loading = false;
      },
    });
  }

  initializeCharts(): void {
    if (!this.dashboardStats?.recentActivity) return;

    const recentData = this.dashboardStats.recentActivity;
    const labels = recentData.map((d) =>
      new Date(d.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    );


    const salesCtx = document.getElementById("salesChart") as HTMLCanvasElement;
    if (salesCtx && !this.salesChart) {
      this.salesChart = new Chart(salesCtx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Sales",
              data: recentData.map((d) => d.totalSales),
              borderColor: "#6366f1",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#6366f1",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: "Revenue ($)",
              data: recentData.map((d) => d.revenue / 100),
              borderColor: "#ec4899",
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              tension: 0.4,
              fill: true,
              pointBackgroundColor: "#ec4899",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "#94a3b8",
                font: { family: "Outfit", size: 12 },
                padding: 15,
                usePointStyle: true,
              },
            },
            tooltip: {
              backgroundColor: "rgba(30, 30, 48, 0.95)",
              titleColor: "#f1f5f9",
              bodyColor: "#94a3b8",
              borderColor: "#2d2d44",
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: (context: any) => {
                  const label = context.dataset.label || "";
                  const value = context.parsed.y;
                  return label.includes("Revenue")
                    ? `${label}: $${value.toFixed(0)}`
                    : `${label}: ${value}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(45, 45, 68, 0.5)",
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#64748b",
                font: { family: "Outfit", size: 11 },
              },
            },
            x: {
              grid: {
                display: false,
              },
              border: {
                display: false,
              },

              ticks: {
                color: "#64748b",
                font: { family: "Outfit", size: 11 },
              },
            },
          },
        },
      });
    }


    const userCtx = document.getElementById(
      "userGrowthChart",
    ) as HTMLCanvasElement;
    if (userCtx && !this.userGrowthChart) {
      this.userGrowthChart = new Chart(userCtx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Active Users",
              data: recentData.map((d) => d.activeUsers),
              backgroundColor: "rgba(99, 102, 241, 0.8)",
              borderColor: "#6366f1",
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            },
            {
              label: "New Signups",
              data: recentData.map((d) => d.newSignups),
              backgroundColor: "rgba(20, 184, 166, 0.8)",
              borderColor: "#14b8a6",
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "#94a3b8",
                font: { family: "Outfit", size: 12 },
                padding: 15,
                usePointStyle: true,
              },
            },
            tooltip: {
              backgroundColor: "rgba(30, 30, 48, 0.95)",
              titleColor: "#f1f5f9",
              bodyColor: "#94a3b8",
              borderColor: "#2d2d44",
              borderWidth: 1,
              padding: 12,
              displayColors: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(45, 45, 68, 0.5)",
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#64748b",
                font: { family: "Outfit", size: 11 },
              },
            },
            x: {
              grid: {
                color: "#e5e7eb",
              },
              border: {
                display: false,
              },
              ticks: {
                color: "#64748b",
                font: { family: "Outfit", size: 11 },
              },
            },
          },
        },
      });
    }
  }

  getTrendClass(trend: string): string {
    const value = parseFloat(trend);
    return value >= 0 ? "trend-up" : "trend-down";
  }

  getTrendIcon(trend: string): string {
    const value = parseFloat(trend);
    return value >= 0 ? "↑" : "↓";
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnDestroy(): void {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    if (this.userGrowthChart) {
      this.userGrowthChart.destroy();
    }
  }
}