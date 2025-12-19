import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Noto'g'ri email format");
const passwordSchema = z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak");

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "", confirmPassword: "" });

  const validateEmail = (email: string): boolean => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Xatolik",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validatePassword = (password: string): boolean => {
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      toast({
        title: "Xatolik",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(loginData.email) || !validatePassword(loginData.password)) {
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Kirish xatosi",
            description: "Email yoki parol noto'g'ri",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Xatolik",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Xush kelibsiz!",
          description: "Muvaffaqiyatli kirdingiz",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Kutilmagan xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(signupData.email) || !validatePassword(signupData.password)) {
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Xatolik",
        description: "Parollar mos kelmaydi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;

      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          toast({
            title: "Xatolik",
            description: "Bu email allaqachon ro'yxatdan o'tgan",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Xatolik",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Muvaffaqiyatli!",
          description: "Hisob yaratildi. Tizimga kirdingiz.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Kutilmagan xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">AdminPro</h1>
          <p className="text-muted-foreground mt-2">Admin paneliga kirish</p>
        </div>

        {/* Auth Card */}
        <Card className="glass-card">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Kirish</TabsTrigger>
                <TabsTrigger value="signup">Ro'yxatdan o'tish</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4 mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="email@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 input-glow"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Parol</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 input-glow"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    {isLoading ? "Yuklanmoqda..." : "Kirish"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup" className="space-y-4 mt-0">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="email@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        className="pl-10 input-glow"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Parol</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        className="pl-10 pr-10 input-glow"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Parolni tasdiqlash</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({ ...signupData, confirmPassword: e.target.value })
                        }
                        className="pl-10 input-glow"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                    {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Davom etish orqali{" "}
          <span className="text-primary hover:underline cursor-pointer">
            Foydalanish shartlari
          </span>{" "}
          va{" "}
          <span className="text-primary hover:underline cursor-pointer">
            Maxfiylik siyosati
          </span>
          ga rozilik bildirasiz.
        </p>
      </div>
    </div>
  );
};

export default Auth;
