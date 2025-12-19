import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  Book,
  Video,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: "1",
    question: "Yangi buyurtma qanday qo'shiladi?",
    answer: "Yangi buyurtma qo'shish uchun chap menyudan \"Buyurtmalar\" bo'limiga o'ting va \"Yangi buyurtma\" tugmasini bosing. Kerakli ma'lumotlarni to'ldiring va saqlang.",
  },
  {
    id: "2",
    question: "Foydalanuvchi parolini qanday tiklash mumkin?",
    answer: "Foydalanuvchilar bo'limiga o'ting, kerakli foydalanuvchini toping va \"Parolni tiklash\" tugmasini bosing. Yangi parol foydalanuvchi emailiga yuboriladi.",
  },
  {
    id: "3",
    question: "Hisobotlarni qanday yuklab olish mumkin?",
    answer: "Analitika bo'limiga o'ting, kerakli davr va hisobot turini tanlang, so'ngra \"Yuklab olish\" tugmasini bosing. Hisobot PDF yoki Excel formatida yuklab olinadi.",
  },
  {
    id: "4",
    question: "Bildirishnomalarni qanday sozlash mumkin?",
    answer: "Sozlamalar bo'limiga o'ting va \"Bildirishnomalar\" tabini tanlang. Bu yerda email, SMS va push bildirishnomalarni yoqish yoki o'chirish mumkin.",
  },
  {
    id: "5",
    question: "Mahsulot narxini qanday o'zgartirish mumkin?",
    answer: "Mahsulotlar bo'limiga o'ting, kerakli mahsulotni toping va \"Tahrirlash\" tugmasini bosing. Narxni o'zgartiring va saqlang.",
  },
  {
    id: "6",
    question: "Tizimga kirish xavfsizligini qanday oshirish mumkin?",
    answer: "Sozlamalar bo'limida \"Xavfsizlik\" tabiga o'ting. Ikki bosqichli autentifikatsiyani yoqing va kuchli parol o'rnating.",
  },
  {
    id: "7",
    question: "Ma'lumotlarni qanday zaxiralash mumkin?",
    answer: "Sozlamalar bo'limida \"Ma'lumotlar\" tabiga o'ting va \"Zaxira nusxa olish\" tugmasini bosing. Zaxira fayl avtomatik yuklab olinadi.",
  },
  {
    id: "8",
    question: "Qo'shimcha foydalanuvchi qanday qo'shiladi?",
    answer: "Foydalanuvchilar bo'limiga o'ting va \"Yangi foydalanuvchi\" tugmasini bosing. Kerakli ma'lumotlarni to'ldiring va rolni belgilang.",
  },
];

const guides = [
  {
    id: "1",
    title: "Boshlash qo'llanmasi",
    description: "Tizimdan foydalanishni boshlash uchun asosiy qadamlar",
    icon: Book,
    color: "bg-primary/10 text-primary",
    articles: 8,
  },
  {
    id: "2",
    title: "Buyurtmalar boshqaruvi",
    description: "Buyurtmalarni yaratish, tahrirlash va kuzatish",
    icon: ShoppingCart,
    color: "bg-success/10 text-success",
    articles: 12,
  },
  {
    id: "3",
    title: "Foydalanuvchilar",
    description: "Foydalanuvchilar va rollarni boshqarish",
    icon: Users,
    color: "bg-accent/10 text-accent",
    articles: 6,
  },
  {
    id: "4",
    title: "Analitika va hisobotlar",
    description: "Statistika va hisobotlar bilan ishlash",
    icon: BarChart3,
    color: "bg-warning/10 text-warning",
    articles: 10,
  },
  {
    id: "5",
    title: "Tizim sozlamalari",
    description: "Tizimni sozlash va personalizatsiya",
    icon: Settings,
    color: "bg-destructive/10 text-destructive",
    articles: 15,
  },
  {
    id: "6",
    title: "Video qo'llanmalar",
    description: "Bosqichma-bosqich video darsliklar",
    icon: Video,
    color: "bg-primary/10 text-primary",
    articles: 20,
  },
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Yordam markazi</h1>
        <p className="text-muted-foreground mt-2">
          Savollaringizga javob toping yoki biz bilan bog'laning
        </p>

        {/* Search */}
        <div className="relative mt-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Savolni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-card border-border text-lg"
          />
        </div>
      </div>

      {/* Quick Guides */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Qo'llanmalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card
                key={guide.id}
                className="bg-card border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", guide.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                      <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>{guide.articles} maqola</span>
                        <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Ko'p so'raladigan savollar</CardTitle>
          <CardDescription>Eng ko'p beriladigan savollarga javoblar</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-border/50">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Savollar topilmadi</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Biz bilan bog'laning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Jonli chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Operatorlarimiz bilan real vaqtda suhbatlashing
              </p>
              <Button className="w-full gap-2">
                Chatni boshlash
                <ExternalLink className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-success" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email orqali</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Savolingizni yozing, 24 soat ichida javob beramiz
              </p>
              <Button variant="outline" className="w-full gap-2">
                support@adminpro.uz
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Telefon orqali</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dushanba - Juma, 9:00 - 18:00
              </p>
              <Button variant="outline" className="w-full gap-2">
                +998 71 123 45 67
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
