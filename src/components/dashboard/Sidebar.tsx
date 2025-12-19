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
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { user, signOut } = useAuth();

  const userEmail = user?.email || "admin@example.com";
  const userName = userEmail.split("@")[0];
  const userInitials = userName.slice(0, 2).toUpperCase();

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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group relative",
                  "hover:scale-[1.02] hover:translate-x-1 active:scale-[0.98]",
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300",
                    active
                      ? "bg-primary-foreground/20"
                      : "bg-muted/50 group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110 group-hover:rotate-3"
                  )}
                >
                  <Icon className="w-[18px] h-[18px] transition-transform duration-300" />
                </div>
                {(!collapsed || isMobileOpen) && (
                  <span className="font-medium text-sm transition-all duration-300 group-hover:translate-x-0.5">{item.label}</span>
                )}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-foreground rounded-r-full animate-pulse" />
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
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group",
                  "hover:scale-[1.02] hover:translate-x-1 active:scale-[0.98]",
                  active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300",
                    active
                      ? "bg-primary-foreground/20"
                      : "bg-muted/50 group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110 group-hover:rotate-3"
                  )}
                >
                  <Icon className="w-[18px] h-[18px] transition-transform duration-300" />
                </div>
                {(!collapsed || isMobileOpen) && (
                  <span className="font-medium text-sm transition-all duration-300 group-hover:translate-x-0.5">{item.label}</span>
                )}
              </button>
            );
          })}

        </div>

        {/* User Profile Card */}
        <div className="p-3 border-t border-border/50">
          <div
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 group cursor-pointer",
              collapsed && !isMobileOpen && "justify-center"
            )}
          >
            <div className="relative">
              <Avatar className="w-10 h-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card" />
            </div>
            
            {(!collapsed || isMobileOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate capitalize">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
              </div>
            )}

            {(!collapsed || isMobileOpen) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-48 bg-popover">
                  <DropdownMenuItem onClick={() => handleNavigation("/settings")}>
                    <Settings className="w-4 h-4 mr-2 text-foreground" />
                    <span>Sozlamalar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Chiqish</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
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
