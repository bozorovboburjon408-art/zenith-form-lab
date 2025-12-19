import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, User, MapPin, CreditCard, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ordersData, Order } from "./Orders";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

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

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = ordersData.find((o) => o.id === id);
  const [status, setStatus] = useState(order?.status || "pending");

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64 transition-all duration-300">
          <Header />
          <main className="p-6">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">Buyurtma topilmadi</h2>
              <p className="text-muted-foreground mb-4">ID: {id}</p>
              <Button onClick={() => navigate("/orders")}>Orqaga qaytish</Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as Order["status"]);
    toast({
      title: "Holat yangilandi",
      description: `Buyurtma holati "${statusLabels[newStatus as keyof typeof statusLabels]}" ga o'zgartirildi`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 transition-all duration-300">
        <Header />

        <main className="p-6 space-y-6">
          {/* Back Button & Title */}
          <div className="flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/orders")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">
                  Buyurtma <span className="text-gradient">{order.id}</span>
                </h1>
                <p className="text-muted-foreground mt-1">{order.createdAt} sanasida yaratilgan</p>
              </div>
            </div>
            <Badge variant="outline" className={`text-base px-4 py-2 ${statusStyles[status]}`}>
              {statusLabels[status]}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Products */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Mahsulotlar
                  </CardTitle>
                  <CardDescription>{order.products.length} ta mahsulot</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Package className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.quantity} dona × ${product.price}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold">${product.quantity * product.price}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Jami summa:</span>
                    <span className="text-gradient">${order.total}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Status Update */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Holatni yangilash</CardTitle>
                  <CardDescription>Buyurtma holatini o'zgartiring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Select value={status} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-64 input-glow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Kutilmoqda</SelectItem>
                        <SelectItem value="processing">Jarayonda</SelectItem>
                        <SelectItem value="shipped">Yetkazilmoqda</SelectItem>
                        <SelectItem value="delivered">Yetkazildi</SelectItem>
                        <SelectItem value="cancelled">Bekor qilindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Info */}
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Mijoz ma'lumotlari
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ism</p>
                    <p className="font-medium">{order.customer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{order.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">{order.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Yetkazib berish manzili
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{order.address}</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    To'lov ma'lumotlari
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usul:</span>
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sana:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {order.createdAt}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Jami:</span>
                    <span className="text-primary">${order.total}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetail;
