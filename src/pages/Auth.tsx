import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap, ArrowRight, Shield, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Noto'g'ri email format");
const passwordSchema = z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak");

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isLoading } = useAuth();
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

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        toast({ title: "Xush kelibsiz!", description: "Muvaffaqiyatli kirdingiz" });
      } else {
        await signUp(formData.email, formData.password);
        toast({ title: "Muvaffaqiyatli!", description: "Hisob yaratildi" });
      }
      navigate("/");
    } catch {
      toast({ title: "Xatolik", description: "Kutilmagan xatolik yuz berdi", variant: "destructive" });
    }
  };

  const features = [
    { icon: BarChart3, label: "Analitika" },
    { icon: Shield, label: "Xavfsizlik" },
    { icon: Users, label: "Jamoa" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-primary/40 rotate-45 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-6 h-6 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-20 w-3 h-3 bg-primary/30 rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 right-32 w-5 h-5 border-2 border-accent/30 rotate-12 animate-float" style={{ animationDelay: '0.8s' }} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-lg shadow-primary/30">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">AdminPro</h1>
        </div>

        {/* Card */}
        <div className="relative">
          {/* Glow effect behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl opacity-60" />
          
          <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-8 shadow-2xl">
            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isLogin 
                    ? 'bg-card text-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Kirish
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-card text-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Ro'yxatdan o'tish
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email manzil
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="sizning@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-muted/30 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 text-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Parol
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-12 pr-12 bg-muted/30 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 text-foreground"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="confirm" className="text-sm font-medium text-foreground">
                    Parolni tasdiqlash
                  </Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="h-12 bg-muted/30 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 text-foreground"
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg shadow-primary/25 group mt-2" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Yuklanmoqda...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground">Afzalliklar</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex justify-center gap-6">
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Davom etish orqali{" "}
          <span className="text-primary cursor-pointer hover:underline">Shartlar</span>
          {" "}va{" "}
          <span className="text-primary cursor-pointer hover:underline">Maxfiylik</span>
          {" "}ga rozilik bildirasiz.
        </p>
      </div>
    </div>
  );
};

export default Auth;
