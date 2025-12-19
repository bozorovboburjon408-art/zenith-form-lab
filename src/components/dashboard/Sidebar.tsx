import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "users", label: "Foydalanuvchilar", icon: Users, path: "/users" },
  { id: "orders", label: "Buyurtmalar", icon: ShoppingCart, path: "/orders" },
  { id: "analytics", label: "Analitika", icon: BarChart3, path: "/analytics" },
  { id: "documents", label: "Hujjatlar", icon: FileText, path: "/documents" },
  { id: "notifications", label: "Bildirishnomalar", icon: Bell, path: "/notifications" },
];

const bottomItems = [
  { id: "settings", label: "Sozlamalar", icon: Settings, path: "/settings" },
  { id: "help", label: "Yordam", icon: HelpCircle, path: "/help" },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar = ({ isMobileOpen, onMobileClose }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Chiqildi",
      description: "Hisobdan muvaffaqiyatli chiqdingiz",
    });
    navigate("/auth");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen flex flex-col transition-all duration-300 z-50",
          "bg-gradient-to-b from-card via-card to-secondary/30",
          "border-r border-border/50",
          // Desktop
          "hidden lg:flex",
          collapsed ? "lg:w-20" : "lg:w-64",
          // Mobile
          isMobileOpen && "flex w-72 lg:hidden"
        )}
      >
        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-4 lg:hidden text-foreground"
          onClick={onMobileClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card" />
          </div>
          {(!collapsed || isMobileOpen) && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground tracking-tight">AdminPro</span>
              <span className="text-xs text-muted-foreground">Boshqaruv paneli</span>
            </div>
          )}
        </div>

        <Separator className="mx-4 w-auto bg-border/50" />

        {/* Menu Label */}
        {(!collapsed || isMobileOpen) && (
          <div className="px-5 pt-5 pb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Asosiy
            </span>
          </div>
        )}

        {/* Main Menu */}
        <nav className="flex-1 py-2 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                    active
                      ? "bg-primary-foreground/20"
                      : "bg-muted/50 group-hover:bg-muted"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                {(!collapsed || isMobileOpen) && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 space-y-1">
          <Separator className="mb-3 bg-border/50" />
          
          {(!collapsed || isMobileOpen) && (
            <div className="px-2 pb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Tizim
              </span>
            </div>
          )}

          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                    active
                      ? "bg-primary-foreground/20"
                      : "bg-muted/50 group-hover:bg-muted"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                {(!collapsed || isMobileOpen) && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-destructive hover:bg-destructive/10"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-destructive/10 group-hover:bg-destructive/20 transition-all duration-200">
              <LogOut className="w-[18px] h-[18px]" />
            </div>
            {(!collapsed || isMobileOpen) && (
              <span className="font-medium text-sm">Chiqish</span>
            )}
          </button>
        </div>

        {/* Collapse Button - Desktop Only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-sm items-center justify-center hover:bg-muted hover:scale-110 transition-all hidden lg:flex"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>
      </aside>
    </>
  );
};
