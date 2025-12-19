import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const products = [
  { name: "iPhone 15 Pro", sales: 1234, percentage: 85 },
  { name: "MacBook Air M3", sales: 987, percentage: 72 },
  { name: "AirPods Pro", sales: 756, percentage: 58 },
  { name: "iPad Pro", sales: 543, percentage: 45 },
  { name: "Apple Watch", sales: 321, percentage: 32 },
];

export const TopProducts = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Top mahsulotlar</CardTitle>
        <CardDescription>Eng ko'p sotilgan mahsulotlar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {products.map((product, index) => (
          <div key={product.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="font-medium">{product.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.sales} sotilgan</span>
            </div>
            <Progress value={product.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
