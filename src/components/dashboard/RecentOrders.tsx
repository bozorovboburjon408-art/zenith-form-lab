import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

const statusStyles = {
  completed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  completed: "Bajarildi",
  pending: "Kutilmoqda",
  processing: "Jarayonda",
  cancelled: "Bekor qilindi",
};

export const RecentOrders = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>So'nggi buyurtmalar</CardTitle>
        <CardDescription>Oxirgi 5 ta buyurtma</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Buyurtma</TableHead>
              <TableHead className="text-muted-foreground">Mijoz</TableHead>
              <TableHead className="text-muted-foreground">Summa</TableHead>
              <TableHead className="text-muted-foreground">Holat</TableHead>
              <TableHead className="text-muted-foreground">Sana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="table-row-hover border-border/50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.customer}`} />
                      <AvatarFallback>{order.customer.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{order.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[order.status as keyof typeof statusStyles]}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
