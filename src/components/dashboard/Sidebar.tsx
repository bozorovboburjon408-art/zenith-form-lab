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
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

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
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-50",
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
          className="absolute right-2 top-4 lg:hidden"
          onClick={onMobileClose}
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          {(!collapsed || isMobileOpen) && (
            <span className="font-bold text-xl text-foreground">AdminPro</span>
          )}
        </div>

        {/* Main Menu */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "w-full sidebar-item",
                isActive(item.path) && "sidebar-item-active"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {(!collapsed || isMobileOpen) && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="py-4 px-3 border-t border-sidebar-border space-y-2">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "w-full sidebar-item",
                isActive(item.path) && "sidebar-item-active"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {(!collapsed || isMobileOpen) && <span>{item.label}</span>}
            </button>
          ))}

          <button
            onClick={handleSignOut}
            className="w-full sidebar-item text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {(!collapsed || isMobileOpen) && <span>Chiqish</span>}
          </button>
        </div>

        {/* Collapse Button - Desktop Only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary border border-border items-center justify-center hover:bg-muted transition-colors hidden lg:flex"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>
    </>
  );
};
