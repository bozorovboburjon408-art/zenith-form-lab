import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { FormSection } from "@/components/dashboard/FormSection";
import { TopProducts } from "@/components/dashboard/TopProducts";

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        <Header />
        
        <main className="p-6 space-y-6">
          {/* Page Title */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
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
        </main>
      </div>
    </div>
  );
};

export default Index;
