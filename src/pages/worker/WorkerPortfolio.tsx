import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Video, AlertCircle, Play } from "lucide-react";
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
  type: "video";
  url: string;
  title: string;
  description: string;
}

const WorkerPortfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      type: "video",
      url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
      title: "Proyek Las Pagar Besi",
      description: "Pembuatan pagar besi untuk rumah tinggal di Jakarta Selatan",
    },
    {
      id: "2",
      type: "video",
      url: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_2mb.mp4",
      title: "Konstruksi Rangka Baja",
      description: "Perakitan rangka baja untuk gudang di kawasan industri",
    },
  ]);

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    url: "",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("video/")) {
      toast({
        title: "Format Tidak Didukung",
        description: "Hanya file video yang diperbolehkan (MP4, MOV, AVI, dll)",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "Ukuran File Terlalu Besar",
        description: "Ukuran file video maksimal 5MB",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    setNewItem({ ...newItem, file, url: URL.createObjectURL(file) });
  };

  const handleAddItem = () => {
    if (!newItem.title || !newItem.url) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon isi judul dan upload video",
        variant: "destructive",
      });
      return;
    }

    const item: PortfolioItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      url: newItem.url,
      type: "video",
    };

    setPortfolioItems([...portfolioItems, item]);
    setNewItem({ title: "", description: "", url: "", file: null });
    setIsDialogOpen(false);

    toast({
      title: "Portfolio Ditambahkan",
      description: "Video portfolio berhasil ditambahkan",
    });
  };

  const handleDeleteItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
    toast({
      title: "Portfolio Dihapus",
      description: "Video portfolio berhasil dihapus",
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
                    <Label htmlFor="video">Upload Video *</Label>
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">
                        <strong>Perhatian:</strong> Ukuran file video maksimal 5MB. 
                        Format yang didukung: MP4, MOV, AVI, WebM.
                      </p>
                    </div>
                    {newItem.url && (
                      <div className="mt-2">
                        <video
                          src={newItem.url}
                          className="w-full aspect-video rounded-lg bg-black"
                          controls
                        />
                      </div>
                    )}
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
              <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Belum Ada Portfolio
              </h3>
              <p className="text-muted-foreground mb-6">
                Tambahkan video hasil kerja Anda untuk meningkatkan
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
                  <div 
                    className="relative aspect-video bg-black cursor-pointer"
                    onClick={() => setSelectedVideo(item)}
                  >
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-primary ml-1" />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
              💡 Tips Portfolio Video yang Menarik
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Rekam video dengan pencahayaan yang baik dan sudut yang jelas</li>
              <li>• Durasi video sebaiknya 30 detik - 2 menit</li>
              <li>• Tunjukkan proses dan hasil akhir pekerjaan</li>
              <li>• Pastikan ukuran file tidak lebih dari 5MB</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {selectedVideo && (
              <video
                src={selectedVideo.url}
                className="w-full aspect-video rounded-lg bg-black"
                controls
                autoPlay
              />
            )}
            <p className="text-sm text-muted-foreground mt-3">
              {selectedVideo?.description}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default WorkerPortfolio;
