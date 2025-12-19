import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Yan", revenue: 4000, orders: 2400 },
  { name: "Fev", revenue: 3000, orders: 1398 },
  { name: "Mar", revenue: 2000, orders: 9800 },
  { name: "Apr", revenue: 2780, orders: 3908 },
  { name: "May", revenue: 1890, orders: 4800 },
  { name: "Iyn", revenue: 2390, orders: 3800 },
  { name: "Iyl", revenue: 3490, orders: 4300 },
  { name: "Avg", revenue: 4000, orders: 2400 },
  { name: "Sen", revenue: 5200, orders: 3200 },
  { name: "Okt", revenue: 4800, orders: 2900 },
  { name: "Noy", revenue: 6000, orders: 3500 },
  { name: "Dek", revenue: 7200, orders: 4100 },
];

export const RevenueChart = () => {
  return (
    <Card className="glass-card col-span-2">
      <CardHeader>
        <CardTitle>Daromad ko'rsatkichlari</CardTitle>
        <CardDescription>Oxirgi 12 oy davomida daromad va buyurtmalar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187 85% 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187 85% 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262 83% 58%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(262 83% 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
              <XAxis dataKey="name" stroke="hsl(215 20% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 20% 55%)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222 47% 10%)",
                  border: "1px solid hsl(222 30% 18%)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(210 40% 98%)" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(187 85% 53%)"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="hsl(262 83% 58%)"
                fillOpacity={1}
                fill="url(#colorOrders)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
