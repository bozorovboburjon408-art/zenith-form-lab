import { Plus, Download, Upload, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { label: "Yangi qo'shish", icon: Plus, variant: "default" as const },
  { label: "Eksport", icon: Download, variant: "secondary" as const },
  { label: "Import", icon: Upload, variant: "secondary" as const },
  { label: "Yangilash", icon: RefreshCw, variant: "outline" as const },
];

export const QuickActions = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Tezkor amallar</CardTitle>
        <CardDescription>Tez-tez ishlatiladigan amallar</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            className="flex items-center gap-2 h-12"
          >
            <action.icon className="w-4 h-4" />
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
