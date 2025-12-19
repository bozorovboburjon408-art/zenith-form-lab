import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, Package, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const orders = [
  {
    id: "ORD-001",
    customer: "Alisher Karimov",
    email: "alisher@email.com",
    amount: "$250.00",
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Malika Tosheva",
    email: "malika@email.com",
    amount: "$150.00",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Jasur Rahimov",
    email: "jasur@email.com",
    amount: "$350.00",
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "Nilufar Saidova",
    email: "nilufar@email.com",
    amount: "$450.00",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-005",
    customer: "Bobur Islomov",
    email: "bobur@email.com",
    amount: "$200.00",
    status: "cancelled",
    date: "2024-01-13",
  },
];

const statusConfig = {
  completed: {
    label: "Bajarildi",
    icon: CheckCircle2,
    className: "bg-success/10 text-success border-success/30 hover:bg-success/20",
  },
  pending: {
    label: "Kutilmoqda",
    icon: Clock,
    className: "bg-warning/10 text-warning border-warning/30 hover:bg-warning/20",
  },
  processing: {
    label: "Jarayonda",
    icon: Loader2,
    className: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20",
  },
  cancelled: {
    label: "Bekor qilindi",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
  },
};

export const RecentOrders = () => {
  const navigate = useNavigate();

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                So'nggi buyurtmalar
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Oxirgi 5 ta buyurtma ko'rsatilmoqda
              </CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-primary hover:text-primary hover:bg-primary/10 rounded-xl"
            onClick={() => navigate("/orders")}
          >
            <span className="text-sm font-semibold">Barchasi</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Buyurtma</TableHead>
              <TableHead>Mijoz</TableHead>
              <TableHead>Summa</TableHead>
              <TableHead>Holat</TableHead>
              <TableHead className="text-right">Sana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              return (
                <TableRow 
                  key={order.id} 
                  className="cursor-pointer group"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-xs font-bold text-muted-foreground group-hover:from-primary/20 group-hover:to-accent/10 group-hover:text-primary transition-colors duration-200">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <span className="font-semibold text-foreground">{order.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all duration-200">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.customer}`} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/10 to-accent/10 text-primary text-xs font-bold">
                          {order.customer.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-foreground">{order.amount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`${status.className} gap-1.5 px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors duration-200`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-muted-foreground font-medium">{order.date}</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
