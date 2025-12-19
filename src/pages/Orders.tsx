import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Eye, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  products: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  address: string;
  createdAt: string;
}

export const ordersData: Order[] = [
  {
    id: "ORD-001",
    customer: "Alisher Karimov",
    email: "alisher@email.com",
    phone: "+998901234567",
    products: [
      { name: "iPhone 15 Pro", quantity: 1, price: 1200 },
      { name: "AirPods Pro", quantity: 1, price: 250 },
    ],
    total: 1450,
    status: "delivered",
    paymentMethod: "Karta",
    address: "Toshkent, Chilonzor tumani, 12-uy",
    createdAt: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Malika Tosheva",
    email: "malika@email.com",
    phone: "+998901234568",
    products: [{ name: "MacBook Air M3", quantity: 1, price: 1300 }],
    total: 1300,
    status: "processing",
    paymentMethod: "Naqd",
    address: "Toshkent, Yunusobod tumani, 5-uy",
    createdAt: "2024-01-16",
  },
  {
    id: "ORD-003",
    customer: "Jasur Rahimov",
    email: "jasur@email.com",
    phone: "+998901234569",
    products: [
      { name: "iPad Pro", quantity: 1, price: 800 },
      { name: "Apple Pencil", quantity: 1, price: 130 },
    ],
    total: 930,
    status: "pending",
    paymentMethod: "Karta",
    address: "Samarqand, Registon ko'chasi, 8-uy",
    createdAt: "2024-01-17",
  },
  {
    id: "ORD-004",
    customer: "Nilufar Saidova",
    email: "nilufar@email.com",
    phone: "+998901234570",
    products: [{ name: "Apple Watch Ultra", quantity: 2, price: 450 }],
    total: 900,
    status: "shipped",
    paymentMethod: "Karta",
    address: "Buxoro, Markaziy ko'cha, 15-uy",
    createdAt: "2024-01-18",
  },
  {
    id: "ORD-005",
    customer: "Bobur Islomov",
    email: "bobur@email.com",
    phone: "+998901234571",
    products: [{ name: "HomePod mini", quantity: 3, price: 100 }],
    total: 300,
    status: "cancelled",
    paymentMethod: "Naqd",
    address: "Toshkent, Mirzo Ulug'bek tumani, 22-uy",
    createdAt: "2024-01-19",
  },
  {
    id: "ORD-006",
    customer: "Dilnoza Qodirova",
    email: "dilnoza@email.com",
    phone: "+998901234572",
    products: [
      { name: "iPhone 15", quantity: 1, price: 900 },
      { name: "MagSafe Charger", quantity: 1, price: 40 },
    ],
    total: 940,
    status: "delivered",
    paymentMethod: "Karta",
    address: "Namangan, Mustaqillik ko'chasi, 3-uy",
    createdAt: "2024-01-20",
  },
];

const statusStyles = {
  pending: "bg-warning/10 text-warning border-warning/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  shipped: "bg-accent/10 text-accent border-accent/20",
  delivered: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  pending: "Kutilmoqda",
  processing: "Jarayonda",
  shipped: "Yetkazilmoqda",
  delivered: "Yetkazildi",
  cancelled: "Bekor qilindi",
};

const Orders = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: ordersData.length,
    pending: ordersData.filter((o) => o.status === "pending").length,
    processing: ordersData.filter((o) => o.status === "processing").length,
    delivered: ordersData.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 transition-all duration-300">
        <Header />

        <main className="p-6 space-y-6">
          {/* Page Title */}
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Buyurtmalar</h1>
              <p className="text-muted-foreground mt-1">
                Barcha buyurtmalarni boshqaring va kuzating
              </p>
            </div>
            <Button onClick={() => navigate("/orders/new")} className="gap-2">
              <Plus className="w-4 h-4" />
              Yangi buyurtma
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-sm text-muted-foreground">Jami buyurtmalar</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-warning">{stats.pending}</div>
                <p className="text-sm text-muted-foreground">Kutilmoqda</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">{stats.processing}</div>
                <p className="text-sm text-muted-foreground">Jarayonda</p>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-success">{stats.delivered}</div>
                <p className="text-sm text-muted-foreground">Yetkazildi</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="glass-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Buyurtmalar ro'yxati</CardTitle>
                  <CardDescription>
                    {filteredOrders.length} ta buyurtma topildi
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Qidirish..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 input-glow"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-44 input-glow">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Holat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barchasi</SelectItem>
                      <SelectItem value="pending">Kutilmoqda</SelectItem>
                      <SelectItem value="processing">Jarayonda</SelectItem>
                      <SelectItem value="shipped">Yetkazilmoqda</SelectItem>
                      <SelectItem value="delivered">Yetkazildi</SelectItem>
                      <SelectItem value="cancelled">Bekor qilindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Buyurtma ID</TableHead>
                    <TableHead className="text-muted-foreground">Mijoz</TableHead>
                    <TableHead className="text-muted-foreground">Mahsulotlar</TableHead>
                    <TableHead className="text-muted-foreground">Summa</TableHead>
                    <TableHead className="text-muted-foreground">Holat</TableHead>
                    <TableHead className="text-muted-foreground">Sana</TableHead>
                    <TableHead className="text-muted-foreground text-right">Amal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="table-row-hover border-border/50">
                      <TableCell className="font-medium text-primary">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-muted-foreground">{order.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-48">
                          {order.products.slice(0, 2).map((p, i) => (
                            <span key={i} className="text-sm">
                              {p.name}
                              {i < Math.min(order.products.length, 2) - 1 && ", "}
                            </span>
                          ))}
                          {order.products.length > 2 && (
                            <span className="text-sm text-muted-foreground">
                              {" "}+{order.products.length - 2} ta
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${order.total}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {order.createdAt}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Ko'rish
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Buyurtma topilmadi</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Orders;
