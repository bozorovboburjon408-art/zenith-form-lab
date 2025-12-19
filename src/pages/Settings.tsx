import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Camera,
  Mail,
  Phone,
  MapPin,
  Lock,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    phone: "+998901234567",
    bio: "Tajribali administrator va dasturchi. 5 yildan ortiq tajriba.",
    location: "Toshkent, O'zbekiston",
    language: "uz",
    timezone: "Asia/Tashkent",
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    sessionTimeout: "30",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    newUsers: true,
    weeklyReport: true,
    marketingEmails: false,
    securityAlerts: true,
    systemUpdates: true,
  });

  const handleProfileSave = () => {
    toast({
      title: "Saqlandi!",
      description: "Profil ma'lumotlari yangilandi",
    });
  };

  const handlePasswordChange = () => {
    if (security.newPassword !== security.confirmPassword) {
      toast({
        title: "Xatolik",
        description: "Yangi parollar mos kelmaydi",
        variant: "destructive",
      });
      return;
    }
    if (security.newPassword.length < 8) {
      toast({
        title: "Xatolik",
        description: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Saqlandi!",
      description: "Parol muvaffaqiyatli o'zgartirildi",
    });
    setSecurity({ ...security, currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleNotificationsSave = () => {
    toast({
      title: "Saqlandi!",
      description: "Bildirishnoma sozlamalari yangilandi",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-64 transition-all duration-300">
        <Header />

        <main className="p-6 space-y-6">
          {/* Page Title */}
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-gradient">Sozlamalar</h1>
            <p className="text-muted-foreground mt-1">
              Hisobingiz va tizim sozlamalarini boshqaring
            </p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="w-4 h-4" />
                Xavfsizlik
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                Bildirishnomalar
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Profil ma'lumotlari</CardTitle>
                  <CardDescription>Shaxsiy ma'lumotlaringizni yangilang</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                        <AvatarFallback className="text-2xl">AU</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p className="text-muted-foreground">{profile.email}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Rasmni o'zgartirish
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ism</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Familiya</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Joylashuv
                      </Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="input-glow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Til</Label>
                      <Select
                        value={profile.language}
                        onValueChange={(value) => setProfile({ ...profile, language: value })}
                      >
                        <SelectTrigger className="input-glow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uz">O'zbekcha</SelectItem>
                          <SelectItem value="ru">Русский</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="input-glow min-h-24"
                      placeholder="O'zingiz haqingizda qisqacha..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleProfileSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Saqlash
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              {/* Change Password */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Parolni o'zgartirish
                  </CardTitle>
                  <CardDescription>
                    Hisobingiz xavfsizligini ta'minlash uchun kuchli parol tanlang
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Joriy parol</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={security.currentPassword}
                        onChange={(e) =>
                          setSecurity({ ...security, currentPassword: e.target.value })
                        }
                        className="input-glow pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Yangi parol</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={security.newPassword}
                          onChange={(e) =>
                            setSecurity({ ...security, newPassword: e.target.value })
                          }
                          className="input-glow pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={security.confirmPassword}
                        onChange={(e) =>
                          setSecurity({ ...security, confirmPassword: e.target.value })
                        }
                        className="input-glow"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handlePasswordChange}>Parolni o'zgartirish</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Two-Factor Authentication */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    Ikki bosqichli autentifikatsiya
                  </CardTitle>
                  <CardDescription>
                    Hisobingizga qo'shimcha xavfsizlik qatlami qo'shing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Key className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">2FA autentifikatsiya</p>
                        <p className="text-sm text-muted-foreground">
                          {security.twoFactorEnabled
                            ? "Faollashtirilgan"
                            : "Hisobingizni himoya qiling"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setSecurity({ ...security, twoFactorEnabled: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Session Settings */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Sessiya sozlamalari</CardTitle>
                  <CardDescription>Avtomatik chiqish vaqtini belgilang</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Avtomatik chiqish vaqti</Label>
                      <Select
                        value={security.sessionTimeout}
                        onValueChange={(value) =>
                          setSecurity({ ...security, sessionTimeout: value })
                        }
                      >
                        <SelectTrigger className="w-64 input-glow">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 daqiqa</SelectItem>
                          <SelectItem value="30">30 daqiqa</SelectItem>
                          <SelectItem value="60">1 soat</SelectItem>
                          <SelectItem value="120">2 soat</SelectItem>
                          <SelectItem value="never">Hech qachon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="destructive" className="gap-2">
                      Barcha qurilmalardan chiqish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Email bildirishnomalar</CardTitle>
                  <CardDescription>
                    Qaysi bildirishnomalarni olishni xohlaysiz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Email bildirishnomalar</p>
                      <p className="text-sm text-muted-foreground">
                        Muhim yangiliklar email orqali
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Push bildirishnomalar</p>
                      <p className="text-sm text-muted-foreground">
                        Brauzer orqali bildirishnomalar
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, pushNotifications: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Bildirishnoma turlari</CardTitle>
                  <CardDescription>Qaysi hodisalar haqida xabar olasiz</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Buyurtma yangilanishlari</p>
                      <p className="text-sm text-muted-foreground">
                        Yangi buyurtmalar va holat o'zgarishlari
                      </p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, orderUpdates: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Yangi foydalanuvchilar</p>
                      <p className="text-sm text-muted-foreground">
                        Yangi ro'yxatdan o'tganlar haqida
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newUsers}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newUsers: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Haftalik hisobot</p>
                      <p className="text-sm text-muted-foreground">
                        Har hafta statistika hisoboti
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, weeklyReport: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Xavfsizlik ogohlantirishlari</p>
                      <p className="text-sm text-muted-foreground">
                        Shubhali faoliyat haqida xabar
                      </p>
                    </div>
                    <Switch
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, securityAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Tizim yangilanishlari</p>
                      <p className="text-sm text-muted-foreground">
                        Yangi funksiyalar va o'zgarishlar
                      </p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, systemUpdates: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Marketing xabarlari</p>
                      <p className="text-sm text-muted-foreground">
                        Maxsus takliflar va yangiliklar
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, marketingEmails: checked })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleNotificationsSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Saqlash
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
