import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { toast } from "@/hooks/use-toast";

interface ProductItem {
  name: string;
  quantity: number;
  price: number;
}

const availableProducts = [
  { name: "iPhone 15 Pro", price: 1200 },
  { name: "iPhone 15", price: 900 },
  { name: "MacBook Air M3", price: 1300 },
  { name: "MacBook Pro 14", price: 2000 },
  { name: "iPad Pro", price: 800 },
  { name: "iPad Air", price: 600 },
  { name: "Apple Watch Ultra", price: 450 },
  { name: "Apple Watch Series 9", price: 400 },
  { name: "AirPods Pro", price: 250 },
  { name: "AirPods Max", price: 550 },
  { name: "HomePod mini", price: 100 },
  { name: "Apple Pencil", price: 130 },
  { name: "MagSafe Charger", price: 40 },
];

const NewOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "card",
  });
  const [products, setProducts] = useState<ProductItem[]>([
    { name: "", quantity: 1, price: 0 },
  ]);

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const updateProduct = (index: number, field: keyof ProductItem, value: string | number) => {
    const updated = [...products];
    if (field === "name") {
      const selectedProduct = availableProducts.find((p) => p.name === value);
      updated[index] = {
        ...updated[index],
        name: value as string,
        price: selectedProduct?.price || 0,
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setProducts(updated);
  };

  const total = products.reduce((sum, p) => sum + p.quantity * p.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customer || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive",
      });
      return;
    }

    if (products.some((p) => !p.name || p.quantity < 1)) {
      toast({
        title: "Xatolik",
        description: "Kamida bitta mahsulot tanlang",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to database
    toast({
      title: "Muvaffaqiyatli!",
      description: "Buyurtma yaratildi",
    });
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 transition-all duration-300">
        <Header />

        <main className="p-6 space-y-6">
          {/* Back Button & Title */}
          <div className="flex items-center gap-4 animate-fade-in">
            <Button variant="ghost" size="icon" onClick={() => navigate("/orders")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Yangi buyurtma</h1>
              <p className="text-muted-foreground mt-1">Yangi buyurtma yarating</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Mijoz ma'lumotlari</CardTitle>
                  <CardDescription>Buyurtma beruvchi haqida ma'lumot</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer">To'liq ism *</Label>
                      <Input
                        id="customer"
                        value={formData.customer}
                        onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                        placeholder="Ism Familiya"
                        className="input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="input-glow"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+998901234567"
                        className="input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>To'lov usuli</Label>
                      <Select
                        value={formData.paymentMethod}
                        onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                      >
                        <SelectTrigger className="input-glow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Karta</SelectItem>
                          <SelectItem value="cash">Naqd</SelectItem>
                          <SelectItem value="transfer">Pul o'tkazma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Manzil *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="To'liq manzilni kiriting"
                      className="input-glow"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-primary" />
                        Mahsulotlar
                      </CardTitle>
                      <CardDescription>Buyurtma uchun mahsulotlarni tanlang</CardDescription>
                    </div>
                    <Button type="button" variant="outline" onClick={addProduct} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Qo'shish
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-end gap-4 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1 space-y-2">
                        <Label>Mahsulot</Label>
                        <Select
                          value={product.name}
                          onValueChange={(value) => updateProduct(index, "name", value)}
                        >
                          <SelectTrigger className="input-glow">
                            <SelectValue placeholder="Tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProducts.map((p) => (
                              <SelectItem key={p.name} value={p.name}>
                                {p.name} - ${p.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-24 space-y-2">
                        <Label>Soni</Label>
                        <Input
                          type="number"
                          min={1}
                          value={product.quantity}
                          onChange={(e) =>
                            updateProduct(index, "quantity", parseInt(e.target.value) || 1)
                          }
                          className="input-glow"
                        />
                      </div>
                      <div className="w-28 space-y-2">
                        <Label>Narx</Label>
                        <Input
                          value={`$${product.price * product.quantity}`}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeProduct(index)}
                        disabled={products.length === 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="glass-card sticky top-24">
                <CardHeader>
                  <CardTitle>Buyurtma xulosasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {products
                      .filter((p) => p.name)
                      .map((product, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {product.name} × {product.quantity}
                          </span>
                          <span>${product.price * product.quantity}</span>
                        </div>
                      ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Jami:</span>
                    <span className="text-gradient">${total}</span>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button type="submit" className="w-full" disabled={total === 0}>
                      Buyurtmani yaratish
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/orders")}
                    >
                      Bekor qilish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default NewOrder;
