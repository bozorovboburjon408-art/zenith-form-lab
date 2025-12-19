import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Jami daromad",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Foydalanuvchilar",
    value: "2,350",
    change: "+180",
    trend: "up",
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Buyurtmalar",
    value: "12,234",
    change: "+19%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Tashriflar",
    value: "573,294",
    change: "-2.5%",
    trend: "down",
    icon: Eye,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="stat-card animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              stat.trend === "up" ? "text-success" : "text-destructive"
            )}>
              {stat.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stat.change}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
          <p className="text-sm text-muted-foreground">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};
