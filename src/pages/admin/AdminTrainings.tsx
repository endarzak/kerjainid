import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Plus, Edit, Trash2, Eye, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface Training {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  price: number;
  instructor: string;
  category: string;
  isCertified: boolean;
  enrolledCount: number;
  modules: string[];
}

const mockTrainings: Training[] = [
  {
    id: "1",
    title: "Sertifikasi Welder BNSP",
    slug: "sertifikasi-welder-bnsp",
    description: "Pelatihan dan sertifikasi welder sesuai standar BNSP. Termasuk teori dan praktik langsung.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
    duration: "5 Hari",
    level: "Intermediate",
    price: 2500000,
    instructor: "Ir. Bambang Susilo",
    category: "Konstruksi",
    isCertified: true,
    enrolledCount: 156,
    modules: ["Teori Dasar Las", "Praktik SMAW", "Praktik GMAW", "Ujian Sertifikasi"],
  },
  {
    id: "2",
    title: "K3 Umum - Ahli K3",
    slug: "k3-umum-ahli",
    description: "Pelatihan K3 untuk menjadi Ahli K3 Umum bersertifikat Kemnaker RI.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
    duration: "12 Hari",
    level: "Advanced",
    price: 5000000,
    instructor: "Dr. Hendra Wijaya",
    category: "Keselamatan Kerja",
    isCertified: true,
    enrolledCount: 89,
    modules: ["Dasar-dasar K3", "Identifikasi Bahaya", "Risk Assessment", "Emergency Response"],
  },
  {
    id: "3",
    title: "Operator Forklift",
    slug: "operator-forklift",
    description: "Pelatihan operator forklift dengan sertifikat SIO Kemnaker.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800",
    duration: "3 Hari",
    level: "Beginner",
    price: 1500000,
    instructor: "Pak Suryadi",
    category: "Logistik",
    isCertified: true,
    enrolledCount: 234,
    modules: ["Teori Forklift", "Praktik Operasi", "Keselamatan", "Ujian SIO"],
  },
];

const AdminTrainings = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    duration: "",
    level: "Beginner",
    price: 0,
    instructor: "",
    category: "",
    isCertified: true,
    modules: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("cms_trainings");
    if (stored) {
      setTrainings(JSON.parse(stored));
    } else {
      setTrainings(mockTrainings);
      localStorage.setItem("cms_trainings", JSON.stringify(mockTrainings));
    }
  }, []);

  const saveTrainings = (newTrainings: Training[]) => {
    setTrainings(newTrainings);
    localStorage.setItem("cms_trainings", JSON.stringify(newTrainings));
  };

  const handleEdit = (training: Training) => {
    setEditingTraining(training);
    setFormData({
      title: training.title,
      slug: training.slug,
      description: training.description,
      image: training.image,
      duration: training.duration,
      level: training.level,
      price: training.price,
      instructor: training.instructor,
      category: training.category,
      isCertified: training.isCertified,
      modules: training.modules.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingTraining(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      image: "",
      duration: "",
      level: "Beginner",
      price: 0,
      instructor: "",
      category: "",
      isCertified: true,
      modules: "",
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const trainingData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      modules: formData.modules.split(",").map((m) => m.trim()),
    };

    if (editingTraining) {
      const updated = trainings.map((t) =>
        t.id === editingTraining.id ? { ...t, ...trainingData } : t
      );
      saveTrainings(updated);
      toast.success("Pelatihan berhasil diupdate!");
    } else {
      const newTraining: Training = {
        id: Date.now().toString(),
        ...trainingData,
        enrolledCount: 0,
      };
      saveTrainings([...trainings, newTraining]);
      toast.success("Pelatihan baru berhasil ditambahkan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = trainings.filter((t) => t.id !== id);
    saveTrainings(updated);
    toast.success("Pelatihan berhasil dihapus!");
  };

  const filteredTrainings = trainings.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-bold text-xl">Kelola Pelatihan</h1>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pelatihan
          </Button>
        </div>
      </header>

      <main className="container py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari judul atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelatihan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Peserta</TableHead>
                <TableHead>Sertifikat</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={training.image}
                        alt={training.title}
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium line-clamp-1">{training.title}</p>
                        <p className="text-xs text-muted-foreground">{training.instructor}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{training.category}</Badge>
                  </TableCell>
                  <TableCell>{training.duration}</TableCell>
                  <TableCell>Rp {training.price.toLocaleString("id-ID")}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {training.enrolledCount}
                    </span>
                  </TableCell>
                  <TableCell>
                    {training.isCertified ? (
                      <Badge className="bg-green-100 text-green-700">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Bersertifikat
                      </Badge>
                    ) : (
                      <Badge variant="outline">Non-sertifikat</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/pelatihan/${training.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(training)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Pelatihan?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus pelatihan "{training.title}"? Tindakan
                              ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(training.id)}>
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Menampilkan {filteredTrainings.length} dari {trainings.length} pelatihan
        </p>
      </main>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTraining ? "Edit Pelatihan" : "Tambah Pelatihan Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Judul Pelatihan</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Kategori</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Konstruksi, K3, Logistik, dll"
                />
              </div>
              <div>
                <Label>Durasi</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="5 Hari"
                />
              </div>
            </div>
            <div>
              <Label>URL Gambar</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Instruktur</Label>
                <Input
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
              </div>
              <div>
                <Label>Harga (Rp)</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label>Modul/Materi (pisahkan dengan koma)</Label>
              <Input
                value={formData.modules}
                onChange={(e) => setFormData({ ...formData, modules: e.target.value })}
                placeholder="Teori Dasar, Praktik, Ujian"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Bersertifikat</Label>
              <Switch
                checked={formData.isCertified}
                onCheckedChange={(checked) => setFormData({ ...formData, isCertified: checked })}
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              {editingTraining ? "Update" : "Tambah Pelatihan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTrainings;
