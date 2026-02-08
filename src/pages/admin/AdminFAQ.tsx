import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, HelpCircle, ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    question: "Bagaimana cara mendaftar sebagai pekerja?",
    answer: "Untuk mendaftar sebagai pekerja, klik tombol 'Daftar' di pojok kanan atas, lalu pilih 'Daftar sebagai Pekerja'. Isi formulir pendaftaran dengan data diri Anda, keahlian, dan pengalaman kerja. Setelah verifikasi, profil Anda akan aktif dan bisa dilihat oleh employer.",
    category: "Pekerja",
    order: 1,
  },
  {
    id: "2",
    question: "Bagaimana cara merekrut pekerja?",
    answer: "Daftar sebagai employer terlebih dahulu, lalu cari pekerja sesuai keahlian yang Anda butuhkan. Anda bisa melihat profil, portfolio, dan rating pekerja sebelum menghubungi mereka melalui WhatsApp.",
    category: "Employer",
    order: 2,
  },
  {
    id: "3",
    question: "Apakah ada biaya untuk menggunakan platform ini?",
    answer: "Pendaftaran gratis untuk pekerja dan employer. Untuk fitur premium seperti prioritas tampilan dan akses lebih banyak kandidat, tersedia paket berlangganan dengan harga terjangkau.",
    category: "Umum",
    order: 3,
  },
  {
    id: "4",
    question: "Bagaimana sistem verifikasi pekerja?",
    answer: "Kami memverifikasi identitas pekerja melalui KTP dan dokumen pendukung lainnya. Pekerja yang terverifikasi akan mendapat badge verified di profilnya.",
    category: "Pekerja",
    order: 4,
  },
  {
    id: "5",
    question: "Bagaimana jika ada masalah dengan pekerja yang direkrut?",
    answer: "Jika ada masalah, Anda bisa menghubungi tim support kami melalui email atau WhatsApp. Kami akan membantu mediasi dan menyelesaikan masalah yang terjadi.",
    category: "Employer",
    order: 5,
  },
];

const faqCategories = ["Umum", "Pekerja", "Employer", "Pembayaran", "Lainnya"];

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "", category: "Umum" });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    const stored = localStorage.getItem("cms_faq");
    if (stored) {
      setFaqs(JSON.parse(stored));
    } else {
      setFaqs(defaultFAQs);
      localStorage.setItem("cms_faq", JSON.stringify(defaultFAQs));
    }
  }, []);

  const saveFaqs = (newFaqs: FAQItem[]) => {
    setFaqs(newFaqs);
    localStorage.setItem("cms_faq", JSON.stringify(newFaqs));
  };

  const handleAdd = () => {
    setEditingFAQ(null);
    setFormData({ question: "", answer: "", category: "Umum" });
    setIsDialogOpen(true);
  };

  const handleEdit = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.question || !formData.answer) {
      toast.error("Pertanyaan dan jawaban harus diisi!");
      return;
    }

    if (editingFAQ) {
      const updated = faqs.map((f) =>
        f.id === editingFAQ.id
          ? { ...f, question: formData.question, answer: formData.answer, category: formData.category }
          : f
      );
      saveFaqs(updated);
      toast.success("FAQ berhasil diupdate!");
    } else {
      const newFAQ: FAQItem = {
        id: Date.now().toString(),
        question: formData.question,
        answer: formData.answer,
        category: formData.category,
        order: faqs.length + 1,
      };
      saveFaqs([...faqs, newFAQ]);
      toast.success("FAQ berhasil ditambahkan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    saveFaqs(updated);
    toast.success("FAQ berhasil dihapus!");
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFaqs = [...faqs];
    [newFaqs[index - 1], newFaqs[index]] = [newFaqs[index], newFaqs[index - 1]];
    newFaqs.forEach((f, i) => (f.order = i + 1));
    saveFaqs(newFaqs);
  };

  const moveDown = (index: number) => {
    if (index === faqs.length - 1) return;
    const newFaqs = [...faqs];
    [newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]];
    newFaqs.forEach((f, i) => (f.order = i + 1));
    saveFaqs(newFaqs);
  };

  const filteredFaqs = filterCategory === "all" 
    ? faqs 
    : faqs.filter((f) => f.category === filterCategory);

  return (
    <AdminLayout title="Kelola FAQ">
      <div className="max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {faqCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {filteredFaqs.length} FAQ
            </span>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah FAQ
          </Button>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <Card key={faq.id}>
              <Collapsible
                open={expandedId === faq.id}
                onOpenChange={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardContent className="p-4 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveUp(index);
                          }}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveDown(index);
                          }}
                          disabled={index === filteredFaqs.length - 1}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {faq.category}
                            </Badge>
                            <h3 className="font-medium text-foreground">
                              {faq.question}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(faq);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Hapus FAQ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus FAQ ini?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Batal</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(faq.id)}>
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            {expandedId === faq.id ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-0 ml-14">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Belum ada FAQ</h3>
              <p className="text-muted-foreground mb-4">
                Mulai dengan menambahkan FAQ pertama.
              </p>
              <Button onClick={handleAdd}>Tambah FAQ</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingFAQ ? "Edit FAQ" : "Tambah FAQ Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Kategori</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {faqCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Pertanyaan</Label>
              <Input
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Tulis pertanyaan..."
              />
            </div>
            <div>
              <Label>Jawaban</Label>
              <Textarea
                rows={5}
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Tulis jawaban yang lengkap..."
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              {editingFAQ ? "Update FAQ" : "Tambah FAQ"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminFAQ;
