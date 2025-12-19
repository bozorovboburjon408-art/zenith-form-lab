import { useNavigate } from "react-router-dom";
import { Search, Bell, User, LogOut, Settings, Menu, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Chiqildi",
      description: "Hisobdan muvaffaqiyatli chiqdingiz",
    });
    navigate("/auth");
  };

  const userEmail = user?.email || "admin@example.com";
  const userName = userEmail.split("@")[0];
  const userInitials = userName.slice(0, 2).toUpperCase();

  return (
    <header className="h-18 border-b border-border/40 bg-gradient-to-r from-card via-card to-card/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-primary/10 hover:text-primary"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Search - Hidden on mobile */}
        <div className="relative w-48 md:w-96 hidden sm:block group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-focus-within:from-primary/20 group-focus-within:to-accent/20 transition-colors duration-200">
            <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
          </div>
          <Input
            placeholder="Qidirish..."
            className="pl-14 h-12 bg-muted/30 border-border/50 rounded-2xl text-sm focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/10 transition-all duration-200"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
            <kbd className="px-2 py-1 text-[10px] font-semibold text-muted-foreground bg-muted/50 rounded-lg border border-border/50">⌘</kbd>
            <kbd className="px-2 py-1 text-[10px] font-semibold text-muted-foreground bg-muted/50 rounded-lg border border-border/50">K</kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme Toggle */}
        <div className="p-1 rounded-xl hover:bg-muted/50 transition-colors duration-200">
          <ThemeToggle />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative w-11 h-11 rounded-xl hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center">
                <Bell className="w-[18px] h-[18px] text-muted-foreground" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground shadow-lg shadow-destructive/30 animate-pulse">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl border-border/50 shadow-xl">
            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  Xabarnomalar
                </h3>
                <Badge variant="secondary" className="rounded-full text-[10px] font-bold px-2.5">
                  3 ta yangi
                </Badge>
              </div>
            </div>
            <div className="py-2">
              <DropdownMenuItem className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 focus:bg-muted/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Yangi buyurtma keldi
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">5 daqiqa oldin</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 focus:bg-muted/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Yangi foydalanuvchi
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">15 daqiqa oldin</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/50 focus:bg-muted/50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Hisobot tayyor
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">1 soat oldin</p>
                </div>
              </DropdownMenuItem>
            </div>
            <div className="p-3 border-t border-border/50">
              <Button 
                variant="ghost" 
                className="w-full h-10 rounded-xl text-sm font-semibold text-primary hover:bg-primary/10"
                onClick={() => navigate("/notifications")}
              >
                Barchasini ko'rish
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="gap-3 px-2 md:px-3 h-12 rounded-2xl hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="relative">
                <Avatar className="w-9 h-9 ring-2 ring-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card" />
              </div>
              <div className="text-left hidden md:block" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <p className="text-sm font-bold text-foreground capitalize">{userName}</p>
                <p className="text-[11px] text-muted-foreground font-medium">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-0 rounded-2xl border-border/50 shadow-xl">
            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-muted/30 to-transparent">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  <p className="font-bold text-foreground capitalize">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              <DropdownMenuItem 
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-medium text-sm">Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="font-medium text-sm">Sozlamalar</span>
              </DropdownMenuItem>
            </div>
            <div className="p-2 border-t border-border/50">
              <DropdownMenuItem 
                onClick={handleSignOut} 
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer rounded-xl text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive"
              >
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Chiqish</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
