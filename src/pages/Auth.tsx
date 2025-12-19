import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Noto'g'ri email format");
const passwordSchema = z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak");

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

  const validateEmail = (email: string): boolean => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Xatolik", description: result.error.errors[0].message, variant: "destructive" });
      return false;
    }
    return true;
  };

  const validatePassword = (password: string): boolean => {
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      toast({ title: "Xatolik", description: result.error.errors[0].message, variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email) || !validatePassword(formData.password)) return;

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({ title: "Xatolik", description: "Parollar mos kelmaydi", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) {
          toast({ title: "Xatolik", description: error.message.includes("Invalid") ? "Email yoki parol noto'g'ri" : error.message, variant: "destructive" });
          return;
        }
        if (data.user) {
          toast({ title: "Xush kelibsiz!", description: "Muvaffaqiyatli kirdingiz" });
          navigate("/");
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) {
          toast({ title: "Xatolik", description: error.message.includes("already") ? "Bu email allaqachon ro'yxatdan o'tgan" : error.message, variant: "destructive" });
          return;
        }
        if (data.user) {
          toast({ title: "Muvaffaqiyatli!", description: "Hisob yaratildi" });
          navigate("/");
        }
      }
    } catch {
      toast({ title: "Xatolik", description: "Kutilmagan xatolik yuz berdi", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse-slow" />
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/30 rounded-full blur-2xl animate-float" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold">AdminPro</span>
          </div>
          
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Biznesingizni<br />
            <span className="text-white/80">yangi darajaga</span><br />
            olib chiqing
          </h1>
          
          <p className="text-lg text-white/70 max-w-md mb-8">
            Zamonaviy boshqaruv tizimi bilan kompaniyangizni rivojlantiring va samaradorlikni oshiring.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {["Real-vaqt analitika", "Xavfsiz ma'lumotlar", "24/7 Qo'llab-quvvatlash"].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-3 h-3" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative">
        {/* Mobile logo */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">AdminPro</span>
        </div>

        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? "Xush kelibsiz!" : "Hisob yaratish"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? "Davom etish uchun hisobingizga kiring" : "Yangi hisob yaratish uchun ma'lumotlarni kiriting"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email manzil</Label>
              <Input
                id="email"
                type="email"
                placeholder="sizning@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-14 px-4 bg-muted/30 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">Parol</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-14 px-4 pr-14 bg-muted/30 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg hover:bg-muted/50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="confirm" className="text-sm font-medium text-foreground">Parolni tasdiqlash</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-14 px-4 bg-muted/30 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base"
                  required
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg shadow-primary/20 group" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Yuklanmoqda...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Hisobingiz yo'qmi?" : "Allaqachon hisobingiz bormi?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline transition-all"
              >
                {isLogin ? "Ro'yxatdan o'ting" : "Kirish"}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-12">
            Davom etish orqali siz bizning <span className="text-primary cursor-pointer hover:underline">Foydalanish shartlari</span> va <span className="text-primary cursor-pointer hover:underline">Maxfiylik siyosati</span>ga rozilik bildirasiz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
