import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Plus, Edit, Trash2, CheckCircle, XCircle, Eye } from "lucide-react";
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
  DialogTrigger,
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
import { mockWorkers } from "@/data/mockData";
import { Worker } from "@/types";
import { toast } from "sonner";

const AdminWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    bio: "",
    yearsExperience: 0,
    ratePerDay: 0,
    isVerified: false,
    isAvailable: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("cms_workers");
    if (stored) {
      setWorkers(JSON.parse(stored));
    } else {
      setWorkers(mockWorkers);
      localStorage.setItem("cms_workers", JSON.stringify(mockWorkers));
    }
  }, []);

  const saveWorkers = (newWorkers: Worker[]) => {
    setWorkers(newWorkers);
    localStorage.setItem("cms_workers", JSON.stringify(newWorkers));
  };

  const handleEdit = (worker: Worker) => {
    setEditingWorker(worker);
    setFormData({
      fullName: worker.fullName,
      phone: worker.phone,
      location: worker.location,
      bio: worker.bio,
      yearsExperience: worker.yearsExperience,
      ratePerDay: worker.ratePerDay || 0,
      isVerified: worker.isVerified,
      isAvailable: worker.isAvailable,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingWorker(null);
    setFormData({
      fullName: "",
      phone: "",
      location: "",
      bio: "",
      yearsExperience: 0,
      ratePerDay: 0,
      isVerified: false,
      isAvailable: true,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingWorker) {
      const updated = workers.map((w) =>
        w.id === editingWorker.id
          ? { ...w, ...formData }
          : w
      );
      saveWorkers(updated);
      toast.success("Pekerja berhasil diupdate!");
    } else {
      const newWorker: Worker = {
        id: Date.now().toString(),
        ...formData,
        skills: [],
        portfolioItems: [],
        averageRating: 0,
        totalReviews: 0,
        totalJobsCompleted: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveWorkers([...workers, newWorker]);
      toast.success("Pekerja baru berhasil ditambahkan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = workers.filter((w) => w.id !== id);
    saveWorkers(updated);
    toast.success("Pekerja berhasil dihapus!");
  };

  const handleVerify = (id: string, verified: boolean) => {
    const updated = workers.map((w) =>
      w.id === id ? { ...w, isVerified: verified } : w
    );
    saveWorkers(updated);
    toast.success(verified ? "Pekerja terverifikasi!" : "Verifikasi dicabut!");
  };

  const filteredWorkers = workers.filter((w) =>
    w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.location.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="font-bold text-xl">Kelola Pekerja</h1>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Pekerja
          </Button>
        </div>
      </header>

      <main className="container py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama atau lokasi..."
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
                <TableHead>Nama</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Pengalaman</TableHead>
                <TableHead>Rate/Hari</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={worker.profilePhoto || "https://via.placeholder.com/40"}
                        alt={worker.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{worker.fullName}</p>
                        <p className="text-xs text-muted-foreground">{worker.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{worker.location}</TableCell>
                  <TableCell>{worker.yearsExperience} tahun</TableCell>
                  <TableCell>Rp {worker.ratePerDay?.toLocaleString("id-ID")}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      ⭐ {worker.averageRating}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {worker.isVerified ? (
                        <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      ) : (
                        <Badge variant="secondary">Unverified</Badge>
                      )}
                      {worker.isAvailable ? (
                        <Badge className="bg-blue-100 text-blue-700">Tersedia</Badge>
                      ) : (
                        <Badge variant="outline">Tidak Tersedia</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/pekerja/${worker.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleVerify(worker.id, !worker.isVerified)}
                      >
                        {worker.isVerified ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(worker)}>
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
                            <AlertDialogTitle>Hapus Pekerja?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus {worker.fullName}? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(worker.id)}>
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
          Menampilkan {filteredWorkers.length} dari {workers.length} pekerja
        </p>
      </main>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingWorker ? "Edit Pekerja" : "Tambah Pekerja Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nama Lengkap</Label>
              <Input
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <Label>No. Telepon</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>Lokasi</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Pengalaman (tahun)</Label>
                <Input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label>Rate/Hari (Rp)</Label>
                <Input
                  type="number"
                  value={formData.ratePerDay}
                  onChange={(e) => setFormData({ ...formData, ratePerDay: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>Terverifikasi</Label>
              <Switch
                checked={formData.isVerified}
                onCheckedChange={(checked) => setFormData({ ...formData, isVerified: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Tersedia</Label>
              <Switch
                checked={formData.isAvailable}
                onCheckedChange={(checked) => setFormData({ ...formData, isAvailable: checked })}
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              {editingWorker ? "Update" : "Tambah"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWorkers;
