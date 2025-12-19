import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  Upload,
  Search,
  MoreVertical,
  Download,
  Eye,
  Trash2,
  FolderOpen,
  Clock,
  HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "spreadsheet" | "other";
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  status: "active" | "archived";
}

const documents: Document[] = [
  {
    id: "1",
    name: "Moliyaviy hisobot Q4.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
    uploadedBy: "admin@example.com",
    status: "active",
  },
  {
    id: "2",
    name: "Mahsulotlar rasmlari.zip",
    type: "image",
    size: "15.8 MB",
    uploadedAt: "2024-01-14",
    uploadedBy: "manager@example.com",
    status: "active",
  },
  {
    id: "3",
    name: "Buyurtmalar jadvali.xlsx",
    type: "spreadsheet",
    size: "1.2 MB",
    uploadedAt: "2024-01-13",
    uploadedBy: "admin@example.com",
    status: "active",
  },
  {
    id: "4",
    name: "Shartnoma shablon.docx",
    type: "other",
    size: "245 KB",
    uploadedAt: "2024-01-12",
    uploadedBy: "lawyer@example.com",
    status: "active",
  },
  {
    id: "5",
    name: "2023 yillik hisobot.pdf",
    type: "pdf",
    size: "5.1 MB",
    uploadedAt: "2024-01-10",
    uploadedBy: "admin@example.com",
    status: "archived",
  },
  {
    id: "6",
    name: "Logo va brendbuk.pdf",
    type: "pdf",
    size: "8.3 MB",
    uploadedAt: "2024-01-08",
    uploadedBy: "designer@example.com",
    status: "active",
  },
];

const getFileIcon = (type: Document["type"]) => {
  switch (type) {
    case "pdf":
      return <FileText className="w-5 h-5 text-destructive" />;
    case "image":
      return <FileImage className="w-5 h-5 text-primary" />;
    case "spreadsheet":
      return <FileSpreadsheet className="w-5 h-5 text-success" />;
    default:
      return <File className="w-5 h-5 text-muted-foreground" />;
  }
};

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "archived">("all");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || doc.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: documents.length,
    active: documents.filter((d) => d.status === "active").length,
    archived: documents.filter((d) => d.status === "archived").length,
    totalSize: "33.1 MB",
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Hujjatlar</h1>
          <p className="text-muted-foreground mt-1">Barcha hujjatlarni boshqaring</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Upload className="w-4 h-4" />
          Fayl yuklash
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Jami fayllar</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              <p className="text-sm text-muted-foreground">Faol</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.archived}</p>
              <p className="text-sm text-muted-foreground">Arxivlangan</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalSize}</p>
              <p className="text-sm text-muted-foreground">Jami hajm</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card border-border/50">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-foreground">Fayllar ro'yxati</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Filter Buttons */}
              <div className="flex gap-2">
                {(["all", "active", "archived"] as const).map((status) => (
                  <Button
                    key={status}
                    variant={filter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(status)}
                    className={cn(
                      filter === status
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {status === "all" ? "Barchasi" : status === "active" ? "Faol" : "Arxiv"}
                  </Button>
                ))}
              </div>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64 bg-secondary/50 border-border"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="text-muted-foreground font-semibold">Fayl nomi</TableHead>
                  <TableHead className="text-muted-foreground font-semibold hidden md:table-cell">Hajmi</TableHead>
                  <TableHead className="text-muted-foreground font-semibold hidden lg:table-cell">Yuklangan</TableHead>
                  <TableHead className="text-muted-foreground font-semibold hidden sm:table-cell">Holat</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="hover:bg-muted/50 transition-colors duration-200"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                          {getFileIcon(doc.type)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{doc.size}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">
                      {doc.size}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div>
                        <p className="text-foreground">{doc.uploadedAt}</p>
                        <p className="text-xs text-muted-foreground">{doc.uploadedBy}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant={doc.status === "active" ? "default" : "secondary"}
                        className={cn(
                          doc.status === "active"
                            ? "bg-success/10 text-success hover:bg-success/20"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {doc.status === "active" ? "Faol" : "Arxiv"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Eye className="w-4 h-4" />
                            Ko'rish
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Download className="w-4 h-4" />
                            Yuklab olish
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4" />
                            O'chirish
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredDocuments.length === 0 && (
              <div className="p-8 text-center">
                <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Hujjatlar topilmadi</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Documents;
