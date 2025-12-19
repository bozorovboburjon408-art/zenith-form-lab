import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const activities = [
  {
    user: "Alisher",
    action: "yangi buyurtma yaratdi",
    time: "5 daqiqa oldin",
    type: "order",
  },
  {
    user: "Malika",
    action: "to'lov amalga oshirdi",
    time: "15 daqiqa oldin",
    type: "payment",
  },
  {
    user: "Jasur",
    action: "hisobini yangiladi",
    time: "1 soat oldin",
    type: "update",
  },
  {
    user: "Nilufar",
    action: "ro'yxatdan o'tdi",
    time: "2 soat oldin",
    type: "register",
  },
  {
    user: "Bobur",
    action: "mahsulot qo'shdi",
    time: "3 soat oldin",
    type: "product",
  },
];

const typeColors = {
  order: "bg-primary",
  payment: "bg-success",
  update: "bg-warning",
  register: "bg-accent",
  product: "bg-primary",
};

export const ActivityFeed = () => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Faollik tarixi</CardTitle>
        <CardDescription>So'nggi harakatlar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`} />
                <AvatarFallback>{activity.user.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
                  typeColors[activity.type as keyof typeof typeColors]
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
