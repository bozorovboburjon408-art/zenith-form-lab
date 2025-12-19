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
  { id: "dashboard", label: "Bosh sahifa", icon: LayoutDashboard, path: "/", badge: null },
  { id: "users", label: "Foydalanuvchilar", icon: Users, path: "/users", badge: null },
  { id: "orders", label: "Buyurtmalar", icon: ShoppingCart, path: "/orders", badge: 12 },
  { id: "analytics", label: "Statistika", icon: BarChart3, path: "/analytics", badge: null },
  { id: "documents", label: "Hujjatlar", icon: FileText, path: "/documents", badge: null },
  { id: "notifications", label: "Xabarlar", icon: Bell, path: "/notifications", badge: 3 },
];

const bottomItems = [
  { id: "settings", label: "Sozlamalar", icon: Settings, path: "/settings" },
  { id: "help", label: "Yordam markazi", icon: HelpCircle, path: "/help" },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const Sidebar = ({ isMobileOpen, onMobileClose, collapsed = false, onCollapsedChange }: SidebarProps) => {
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
          <div className="relative group/logo">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 group-hover/logo:scale-105 group-hover/logo:rotate-3">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-card animate-pulse" />
          </div>
          {(!collapsed || isMobileOpen) && (
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                AdminPro
              </span>
              <span className="text-[11px] text-muted-foreground font-medium tracking-wide">
                Boshqaruv tizimi
              </span>
            </div>
          )}
        </div>

        <Separator className="mx-4 w-auto bg-border/40" />

        {/* Menu Label */}
        {(!collapsed || isMobileOpen) && (
          <div className="px-5 pt-5 pb-3">
            <span className="text-[10px] font-bold text-primary/70 uppercase tracking-[0.2em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Navigatsiya
            </span>
          </div>
        )}

        {/* Main Menu */}
        <nav className="flex-1 py-2 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                className={cn(
                  "w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-colors duration-200 group relative",
                  active
                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200",
                    active
                      ? "bg-primary-foreground/20"
                      : "bg-muted/50 group-hover:bg-primary/20"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5",
                    !active && "group-hover:text-primary"
                  )} />
                </div>
                {(!collapsed || isMobileOpen) && (
                  <span className={cn(
                    "font-semibold text-[13px] tracking-wide flex-1 text-left",
                    active && "text-primary-foreground"
                  )}>
                    {item.label}
                  </span>
                )}
                {item.badge && (
                  <span
                    className={cn(
                      "min-w-6 h-6 px-2 rounded-full text-[11px] font-bold flex items-center justify-center",
                      active
                        ? "bg-primary-foreground/25 text-primary-foreground"
                        : "bg-gradient-to-r from-primary to-accent text-primary-foreground",
                      collapsed && !isMobileOpen && "absolute -top-1 -right-1 min-w-5 h-5 text-[10px] px-1.5"
                    )}
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 space-y-1.5">
          <Separator className="mb-4 bg-gradient-to-r from-transparent via-border/60 to-transparent" />
          
          {(!collapsed || isMobileOpen) && (
            <div className="px-2 pb-3">
              <span className="text-[10px] font-bold text-accent/70 uppercase tracking-[0.2em]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Qo'shimcha
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
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                className={cn(
                  "w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl transition-colors duration-200 group",
                  active
                    ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200",
                    active
                      ? "bg-primary-foreground/20"
                      : "bg-muted/50 group-hover:bg-primary/20"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5",
                    !active && "group-hover:text-primary"
                  )} />
                </div>
                {(!collapsed || isMobileOpen) && (
                  <span className={cn(
                    "font-semibold text-[13px] tracking-wide",
                    active && "text-primary-foreground"
                  )}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

        </div>

        {/* User Profile Card */}
        <div className="p-3 border-t border-border/40">
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-muted/40 to-muted/20 hover:from-muted/60 hover:to-muted/30 transition-all duration-300 group cursor-pointer",
              collapsed && !isMobileOpen && "justify-center p-2"
            )}
          >
            <div className="relative">
              <Avatar className="w-11 h-11 ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300 group-hover:scale-105">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-sm">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-card animate-pulse" />
            </div>
            
            {(!collapsed || isMobileOpen) && (
              <div className="flex-1 min-w-0" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                <p className="text-sm font-bold text-foreground truncate capitalize tracking-wide">{userName}</p>
                <p className="text-[11px] text-muted-foreground truncate font-medium">{userEmail}</p>
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
          onClick={() => onCollapsedChange?.(!collapsed)}
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
