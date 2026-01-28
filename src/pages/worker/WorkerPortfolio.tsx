import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Image, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

interface PortfolioItem {
  id: string;
  type: "image" | "video";
  url: string;
  title: string;
  description: string;
}

const WorkerPortfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      type: "image",
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
      title: "Proyek Las Pagar Besi",
      description: "Pembuatan pagar besi untuk rumah tinggal di Jakarta Selatan",
    },
    {
      id: "2",
      type: "image",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      title: "Konstruksi Rangka Baja",
      description: "Perakitan rangka baja untuk gudang di kawasan industri",
    },
  ]);

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    url: "",
    type: "image" as "image" | "video",
  });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.url) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon isi judul dan URL gambar/video",
        variant: "destructive",
      });
      return;
    }

    const item: PortfolioItem = {
      id: Date.now().toString(),
      ...newItem,
    };

    setPortfolioItems([...portfolioItems, item]);
    setNewItem({ title: "", description: "", url: "", type: "image" });
    setIsDialogOpen(false);

    toast({
      title: "Portfolio Ditambahkan",
      description: "Item portfolio berhasil ditambahkan",
    });
  };

  const handleDeleteItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
    toast({
      title: "Portfolio Dihapus",
      description: "Item portfolio berhasil dihapus",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/dashboard/worker")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Portfolio Saya
              </h1>
              <p className="text-muted-foreground mt-1">
                Tampilkan hasil kerja terbaik Anda
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Portfolio
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Portfolio Baru</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul *</Label>
                    <Input
                      id="title"
                      placeholder="Contoh: Proyek Las Pagar"
                      value={newItem.title}
                      onChange={(e) =>
                        setNewItem({ ...newItem, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">URL Gambar/Video *</Label>
                    <Input
                      id="url"
                      placeholder="https://..."
                      value={newItem.url}
                      onChange={(e) =>
                        setNewItem({ ...newItem, url: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload gambar ke layanan seperti Imgur, lalu paste URL-nya
                      di sini
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Tipe</Label>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={newItem.type === "image" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewItem({ ...newItem, type: "image" })}
                      >
                        <Image className="mr-2 h-4 w-4" />
                        Gambar
                      </Button>
                      <Button
                        type="button"
                        variant={newItem.type === "video" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewItem({ ...newItem, type: "video" })}
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Video
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan tentang proyek ini..."
                      rows={3}
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button className="flex-1" onClick={handleAddItem}>
                      Tambah
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {portfolioItems.length === 0 ? (
            <div className="card-elevated p-12 text-center">
              <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Belum Ada Portfolio
              </h3>
              <p className="text-muted-foreground mb-6">
                Tambahkan foto atau video hasil kerja Anda untuk meningkatkan
                peluang dilirik oleh pemberi kerja
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Portfolio Pertama
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div key={item.id} className="card-elevated overflow-hidden group">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                          <Video className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <h3 className="font-semibold text-foreground mb-2">
              💡 Tips Portfolio yang Menarik
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Gunakan foto dengan pencahayaan yang baik dan sudut yang jelas</li>
              <li>• Tambahkan deskripsi detail tentang proyek dan peran Anda</li>
              <li>• Sertakan foto before/after jika memungkinkan</li>
              <li>• Video singkat bisa memberikan kesan lebih profesional</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default WorkerPortfolio;
