import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { FormSection } from "@/components/dashboard/FormSection";
import { TopProducts } from "@/components/dashboard/TopProducts";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Page Title */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold text-gradient">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Xush kelibsiz! Bu yerda barcha statistikangizni ko'rishingiz mumkin.
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <ActivityFeed />
      </div>

      {/* Orders and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <TopProducts />
        </div>
      </div>

      {/* Forms Section */}
      <FormSection />
    </DashboardLayout>
  );
};

export default Index;
