import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bell,
  ShoppingCart,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  Check,
  BellOff,
  Clock,
  Package,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "order" | "user" | "warning" | "success" | "info" | "payment";
  isRead: boolean;
  createdAt: string;
  timeAgo: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Yangi buyurtma keldi",
    message: "Abdullayev Sardor $450 miqdorida yangi buyurtma berdi",
    type: "order",
    isRead: false,
    createdAt: "2024-01-15 14:30",
    timeAgo: "5 daqiqa oldin",
  },
  {
    id: "2",
    title: "Yangi foydalanuvchi",
    message: "Karimova Nilufar tizimga ro'yxatdan o'tdi",
    type: "user",
    isRead: false,
    createdAt: "2024-01-15 14:15",
    timeAgo: "20 daqiqa oldin",
  },
  {
    id: "3",
    title: "To'lov qabul qilindi",
    message: "#ORD-1234 buyurtma uchun to'lov muvaffaqiyatli amalga oshirildi",
    type: "payment",
    isRead: false,
    createdAt: "2024-01-15 13:45",
    timeAgo: "50 daqiqa oldin",
  },
  {
    id: "4",
    title: "Omborda kam qoldi",
    message: "iPhone 15 Pro mahsuloti omborda 5 ta qoldi",
    type: "warning",
    isRead: true,
    createdAt: "2024-01-15 12:00",
    timeAgo: "2 soat oldin",
  },
  {
    id: "5",
    title: "Buyurtma yetkazildi",
    message: "#ORD-1230 buyurtma mijozga muvaffaqiyatli yetkazildi",
    type: "success",
    isRead: true,
    createdAt: "2024-01-15 10:30",
    timeAgo: "4 soat oldin",
  },
  {
    id: "6",
    title: "Tizim yangilandi",
    message: "AdminPro v2.1.0 versiyasi muvaffaqiyatli o'rnatildi",
    type: "info",
    isRead: true,
    createdAt: "2024-01-14 18:00",
    timeAgo: "Kecha",
  },
  {
    id: "7",
    title: "Yangi buyurtma",
    message: "Rahimov Jasur $320 miqdorida buyurtma berdi",
    type: "order",
    isRead: true,
    createdAt: "2024-01-14 15:20",
    timeAgo: "Kecha",
  },
  {
    id: "8",
    title: "Hisobot tayyor",
    message: "Oylik moliyaviy hisobot yuklab olishga tayyor",
    type: "info",
    isRead: true,
    createdAt: "2024-01-14 09:00",
    timeAgo: "Kecha",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return <ShoppingCart className="w-5 h-5" />;
    case "user":
      return <Users className="w-5 h-5" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5" />;
    case "success":
      return <CheckCircle className="w-5 h-5" />;
    case "payment":
      return <CreditCard className="w-5 h-5" />;
    default:
      return <Info className="w-5 h-5" />;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "order":
      return "bg-primary/10 text-primary";
    case "user":
      return "bg-accent/10 text-accent";
    case "warning":
      return "bg-warning/10 text-warning";
    case "success":
      return "bg-success/10 text-success";
    case "payment":
      return "bg-success/10 text-success";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => !n.isRead).length,
    read: notifications.filter((n) => n.isRead).length,
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  const markAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (selectedIds.includes(n.id) ? { ...n, isRead: true } : n))
    );
    setSelectedIds([]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bildirishnomalar</h1>
          <p className="text-muted-foreground mt-1">Barcha bildirishnomalarni ko'ring</p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={markAllAsRead}
          disabled={stats.unread === 0}
        >
          <Check className="w-4 h-4" />
          Barchasini o'qilgan deb belgilash
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Jami</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.unread}</p>
              <p className="text-sm text-muted-foreground">O'qilmagan</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.read}</p>
              <p className="text-sm text-muted-foreground">O'qilgan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-foreground">Bildirishnomalar ro'yxati</CardTitle>
            <div className="flex flex-wrap gap-2">
              {/* Filter Buttons */}
              {(["all", "unread", "read"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(status)}
                  className={cn(
                    filter === status
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {status === "all" ? "Barchasi" : status === "unread" ? "O'qilmagan" : "O'qilgan"}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-foreground">
                {selectedIds.length} ta tanlangan
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={markAsRead} className="gap-1">
                  <Check className="w-4 h-4" />
                  O'qilgan
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={deleteSelected}
                  className="gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  O'chirish
                </Button>
              </div>
            </div>
          )}

          {/* Select All */}
          {filteredNotifications.length > 0 && (
            <div className="mb-3 flex items-center gap-2">
              <Checkbox
                checked={selectedIds.length === filteredNotifications.length && filteredNotifications.length > 0}
                onCheckedChange={selectAll}
              />
              <span className="text-sm text-muted-foreground">Barchasini tanlash</span>
            </div>
          )}

          {/* Notifications */}
          <div className="space-y-3">
            {filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-sm group",
                  notif.isRead
                    ? "bg-background border-border/50"
                    : "bg-primary/5 border-primary/20"
                )}
              >
                <Checkbox
                  checked={selectedIds.includes(notif.id)}
                  onCheckedChange={() => toggleSelect(notif.id)}
                  className="mt-1"
                />
                
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0", getNotificationColor(notif.type))}>
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={cn("font-medium", notif.isRead ? "text-foreground" : "text-foreground")}>
                        {notif.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                    </div>
                    {!notif.isRead && (
                      <Badge className="bg-primary text-primary-foreground flex-shrink-0">
                        Yangi
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{notif.timeAgo}</p>
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="p-8 text-center">
                <BellOff className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Bildirishnomalar topilmadi</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Notifications;
