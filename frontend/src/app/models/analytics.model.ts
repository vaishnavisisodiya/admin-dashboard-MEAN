export interface DashboardStats {
  overview: {
    totalUsers: number;
    activeUsers: number;
    newSignups: number;
    totalSales: number;
    revenue: number;
    conversionRate: number;
  };
  trends: {
    usersTrend: string;
    salesTrend: string;
    revenueTrend: string;
  };
  recentActivity: AnalyticsData[];
}

export interface AnalyticsData {
  _id: string;
  date: Date;
  totalUsers: number;
  activeUsers: number;
  newSignups: number;
  totalSales: number;
  revenue: number;
  conversionRate: number;
}

export interface SalesData {
  date: Date;
  totalSales: number;
  revenue: number;
}

export interface RevenueBreakdown {
  timeline: AnalyticsData[];
  breakdown: {
    products: string;
    services: string;
    subscriptions: string;
  };
  total: string;
}
