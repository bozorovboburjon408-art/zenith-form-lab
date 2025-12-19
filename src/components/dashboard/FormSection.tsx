import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

export const FormSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Muvaffaqiyatli!",
      description: "Ma'lumotlar saqlandi",
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Forma elementlari</CardTitle>
        <CardDescription>Barcha forma komponentlari namunasi</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Ism</Label>
              <Input
                id="name"
                placeholder="Ismingizni kiriting"
                className="input-glow"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="input-glow"
              />
            </div>

            {/* Select */}
            <div className="space-y-2">
              <Label>Kategoriya</Label>
              <Select>
                <SelectTrigger className="input-glow">
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Elektronika</SelectItem>
                  <SelectItem value="clothing">Kiyim-kechak</SelectItem>
                  <SelectItem value="food">Oziq-ovqat</SelectItem>
                  <SelectItem value="other">Boshqa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number Input */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Miqdor</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                className="input-glow"
              />
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <Label htmlFor="description">Tavsif</Label>
            <Textarea
              id="description"
              placeholder="Tavsifni kiriting..."
              className="input-glow min-h-24"
            />
          </div>

          {/* Radio Group */}
          <div className="space-y-3">
            <Label>Turi</Label>
            <RadioGroup defaultValue="standard" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="font-normal">Standart</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium" className="font-normal">Premium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="enterprise" id="enterprise" />
                <Label htmlFor="enterprise" className="font-normal">Enterprise</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Checkbox and Switch */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="font-normal">
                Shartlarga roziman
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications" className="font-normal">
                Bildirishnomalar
              </Label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit">Saqlash</Button>
            <Button type="button" variant="secondary">
              Bekor qilish
            </Button>
            <Button type="button" variant="outline">
              Qoralama
            </Button>
            <Button type="button" variant="destructive">
              O'chirish
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
