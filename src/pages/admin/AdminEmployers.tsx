import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Plus, Edit, Trash2, Star, Crown, Eye } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employer, Industry, INDUSTRY_LABELS } from "@/types";
import { toast } from "sonner";

const mockEmployers: Employer[] = [
  {
    id: "e1",
    companyName: "PT Konstruksi Jaya",
    email: "hr@konstruksijaya.com",
    phone: "+6221123456",
    industry: "konstruksi",
    location: "Jakarta",
    averageRating: 4.5,
    isPremium: true,
    premiumUntil: "2024-12-31",
    createdAt: "2023-06-15",
  },
  {
    id: "e2",
    companyName: "CV Maju Bersama",
    email: "info@majubersama.co.id",
    phone: "+6221789012",
    industry: "logistik",
    location: "Surabaya",
    averageRating: 4.2,
    isPremium: false,
    createdAt: "2023-08-20",
  },
  {
    id: "e3",
    companyName: "Garment Makmur",
    email: "hrd@garmentmakmur.com",
    phone: "+62227890123",
    industry: "manufaktur",
    location: "Bandung",
    averageRating: 4.7,
    isPremium: true,
    premiumUntil: "2025-03-15",
    createdAt: "2023-04-10",
  },
];

const AdminEmployers = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployer, setEditingEmployer] = useState<Employer | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    industry: "konstruksi" as Industry,
    location: "",
    isPremium: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("cms_employers");
    if (stored) {
      setEmployers(JSON.parse(stored));
    } else {
      setEmployers(mockEmployers);
      localStorage.setItem("cms_employers", JSON.stringify(mockEmployers));
    }
  }, []);

  const saveEmployers = (newEmployers: Employer[]) => {
    setEmployers(newEmployers);
    localStorage.setItem("cms_employers", JSON.stringify(newEmployers));
  };

  const handleEdit = (employer: Employer) => {
    setEditingEmployer(employer);
    setFormData({
      companyName: employer.companyName,
      email: employer.email,
      phone: employer.phone,
      industry: employer.industry,
      location: employer.location,
      isPremium: employer.isPremium,
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingEmployer(null);
    setFormData({
      companyName: "",
      email: "",
      phone: "",
      industry: "konstruksi",
      location: "",
      isPremium: false,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingEmployer) {
      const updated = employers.map((e) =>
        e.id === editingEmployer.id ? { ...e, ...formData } : e
      );
      saveEmployers(updated);
      toast.success("Employer berhasil diupdate!");
    } else {
      const newEmployer: Employer = {
        id: Date.now().toString(),
        ...formData,
        averageRating: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveEmployers([...employers, newEmployer]);
      toast.success("Employer baru berhasil ditambahkan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = employers.filter((e) => e.id !== id);
    saveEmployers(updated);
    toast.success("Employer berhasil dihapus!");
  };

  const handleTogglePremium = (id: string, isPremium: boolean) => {
    const updated = employers.map((e) =>
      e.id === id
        ? {
            ...e,
            isPremium,
            premiumUntil: isPremium
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
              : undefined,
          }
        : e
    );
    saveEmployers(updated);
    toast.success(isPremium ? "Upgrade ke Premium!" : "Downgrade dari Premium!");
  };

  const filteredEmployers = employers.filter(
    (e) =>
      e.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase())
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
            <h1 className="font-bold text-xl">Kelola Employer</h1>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Employer
          </Button>
        </div>
      </header>

      <main className="container py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama perusahaan atau lokasi..."
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
                <TableHead>Perusahaan</TableHead>
                <TableHead>Industri</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployers.map((employer) => (
                <TableRow key={employer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        {employer.companyName}
                        {employer.isPremium && (
                          <Crown className="h-4 w-4 text-yellow-500" />
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{employer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{INDUSTRY_LABELS[employer.industry]}</Badge>
                  </TableCell>
                  <TableCell>{employer.location}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      {employer.averageRating}
                    </span>
                  </TableCell>
                  <TableCell>
                    {employer.isPremium ? (
                      <Badge className="bg-yellow-100 text-yellow-700">
                        Premium s/d {employer.premiumUntil}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleTogglePremium(employer.id, !employer.isPremium)}
                        title={employer.isPremium ? "Remove Premium" : "Make Premium"}
                      >
                        <Crown
                          className={`h-4 w-4 ${
                            employer.isPremium ? "text-yellow-500" : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(employer)}>
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
                            <AlertDialogTitle>Hapus Employer?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus {employer.companyName}? Tindakan ini
                              tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(employer.id)}>
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
          Menampilkan {filteredEmployers.length} dari {employers.length} employer
        </p>
      </main>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingEmployer ? "Edit Employer" : "Tambah Employer Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nama Perusahaan</Label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              <Label>Industri</Label>
              <Select
                value={formData.industry}
                onValueChange={(value) =>
                  setFormData({ ...formData, industry: value as Industry })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(INDUSTRY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Lokasi</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Premium</Label>
              <Switch
                checked={formData.isPremium}
                onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              {editingEmployer ? "Update" : "Tambah"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEmployers;
