import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { cn } from "@/lib/utils";

// Revenue data
const revenueData = [
  { month: "Yan", revenue: 4200, orders: 120, users: 45 },
  { month: "Fev", revenue: 3800, orders: 98, users: 52 },
  { month: "Mar", revenue: 5100, orders: 145, users: 68 },
  { month: "Apr", revenue: 4600, orders: 132, users: 71 },
  { month: "May", revenue: 5800, orders: 165, users: 89 },
  { month: "Iyn", revenue: 6200, orders: 178, users: 95 },
  { month: "Iyl", revenue: 7100, orders: 198, users: 112 },
  { month: "Avg", revenue: 6800, orders: 187, users: 108 },
  { month: "Sen", revenue: 7500, orders: 210, users: 125 },
  { month: "Okt", revenue: 8200, orders: 235, users: 142 },
  { month: "Noy", revenue: 9100, orders: 265, users: 168 },
  { month: "Dek", revenue: 10500, orders: 298, users: 195 },
];

// Order status data for pie chart
const orderStatusData = [
  { name: "Yetkazildi", value: 450, color: "hsl(142 76% 36%)" },
  { name: "Jarayonda", value: 120, color: "hsl(187 85% 53%)" },
  { name: "Kutilmoqda", value: 80, color: "hsl(38 92% 50%)" },
  { name: "Bekor qilindi", value: 35, color: "hsl(0 72% 51%)" },
];

// Category sales data
const categorySalesData = [
  { category: "Telefonlar", sales: 45000, lastMonth: 38000 },
  { category: "Noutbuklar", sales: 38000, lastMonth: 42000 },
  { category: "Planshetlar", sales: 22000, lastMonth: 18000 },
  { category: "Soatlar", sales: 18000, lastMonth: 15000 },
  { category: "Quloqchinlar", sales: 12000, lastMonth: 10000 },
  { category: "Aksessuarlar", sales: 8000, lastMonth: 7500 },
];

// Daily visitors data
const visitorsData = [
  { day: "Dush", visitors: 1200, pageViews: 3400 },
  { day: "Sesh", visitors: 1400, pageViews: 4100 },
  { day: "Chor", visitors: 1100, pageViews: 3200 },
  { day: "Pay", visitors: 1600, pageViews: 4800 },
  { day: "Jum", visitors: 1800, pageViews: 5200 },
  { day: "Shan", visitors: 2200, pageViews: 6100 },
  { day: "Yak", visitors: 1900, pageViews: 5400 },
];

// Top products
const topProducts = [
  { name: "iPhone 15 Pro", sales: 234, revenue: 280800, growth: 12.5 },
  { name: "MacBook Air M3", sales: 156, revenue: 202800, growth: 8.3 },
  { name: "iPad Pro", sales: 189, revenue: 151200, growth: 15.2 },
  { name: "Apple Watch Ultra", sales: 145, revenue: 65250, growth: -3.4 },
  { name: "AirPods Pro", sales: 312, revenue: 78000, growth: 22.1 },
];

// Stats cards data
const statsCards = [
  {
    title: "Jami daromad",
    value: "$79,100",
    change: "+23.5%",
    trend: "up",
    icon: DollarSign,
    description: "O'tgan oyga nisbatan",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Buyurtmalar",
    value: "2,231",
    change: "+18.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "O'tgan oyga nisbatan",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Foydalanuvchilar",
    value: "1,420",
    change: "+12.8%",
    trend: "up",
    icon: Users,
    description: "Yangi ro'yxatdan o'tganlar",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Tashriflar",
    value: "89,420",
    change: "-2.4%",
    trend: "down",
    icon: Eye,
    description: "O'tgan oyga nisbatan",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 transition-all duration-300">
        <Header />

        <main className="p-6 space-y-6">
          {/* Page Title */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gradient">Analitika</h1>
            <p className="text-muted-foreground mt-1">
              Biznesingiz ko'rsatkichlarini kuzating va tahlil qiling
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => (
              <Card
                key={stat.title}
                className="stat-card animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor)}>
                      <stat.icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        stat.trend === "up" ? "text-success" : "text-destructive"
                      )}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Daromad dinamikasi</CardTitle>
                <CardDescription>Yillik daromad ko'rsatkichlari</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="revenue" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="revenue">Daromad</TabsTrigger>
                    <TabsTrigger value="orders">Buyurtmalar</TabsTrigger>
                    <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
                  </TabsList>
                  <TabsContent value="revenue" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(187 85% 53%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(187 85% 53%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                        <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                        <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(222 47% 10%)",
                            border: "1px solid hsl(222 30% 18%)",
                            borderRadius: "8px",
                          }}
                          formatter={(value: number) => [`$${value}`, "Daromad"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="hsl(187 85% 53%)"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="orders" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                        <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                        <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(222 47% 10%)",
                            border: "1px solid hsl(222 30% 18%)",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="orders"
                          stroke="hsl(142 76% 36%)"
                          strokeWidth={2}
                          dot={{ fill: "hsl(142 76% 36%)", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="users" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(262 83% 58%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(262 83% 58%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                        <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={12} />
                        <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(222 47% 10%)",
                            border: "1px solid hsl(222 30% 18%)",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="users"
                          stroke="hsl(262 83% 58%)"
                          fillOpacity={1}
                          fill="url(#colorUsers)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Order Status Pie Chart */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Buyurtmalar holati</CardTitle>
                <CardDescription>Joriy oy statistikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222 47% 10%)",
                          border: "1px solid hsl(222 30% 18%)",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {orderStatusData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm font-medium ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Sales */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Kategoriya bo'yicha sotuvlar</CardTitle>
                <CardDescription>Bu oy vs o'tgan oy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categorySalesData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                      <XAxis type="number" stroke="hsl(215 20% 55%)" fontSize={12} />
                      <YAxis
                        dataKey="category"
                        type="category"
                        stroke="hsl(215 20% 55%)"
                        fontSize={12}
                        width={100}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222 47% 10%)",
                          border: "1px solid hsl(222 30% 18%)",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                      />
                      <Legend />
                      <Bar dataKey="sales" name="Bu oy" fill="hsl(187 85% 53%)" radius={4} />
                      <Bar dataKey="lastMonth" name="O'tgan oy" fill="hsl(222 30% 30%)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Visitors */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Haftalik tashriflar</CardTitle>
                <CardDescription>Tashrif va sahifa ko'rishlari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={visitorsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                      <XAxis dataKey="day" stroke="hsl(215 20% 55%)" fontSize={12} />
                      <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(222 47% 10%)",
                          border: "1px solid hsl(222 30% 18%)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="visitors" name="Tashriflar" fill="hsl(262 83% 58%)" radius={4} />
                      <Bar dataKey="pageViews" name="Sahifa ko'rishlari" fill="hsl(187 85% 43%)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Products Table */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Top mahsulotlar</CardTitle>
              <CardDescription>Eng ko'p sotilgan mahsulotlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} dona sotildi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                      <p
                        className={cn(
                          "text-sm flex items-center justify-end gap-1",
                          product.growth >= 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        {product.growth >= 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {product.growth >= 0 ? "+" : ""}
                        {product.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
