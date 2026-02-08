import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Tags, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: string[];
}

const defaultCategories: SkillCategory[] = [
  {
    id: "1",
    name: "Konstruksi",
    icon: "🏗️",
    skills: ["Welder/Las", "Tukang Batu", "Tukang Kayu", "Tukang Cat", "Tukang Keramik", "Atap/Roofer"],
  },
  {
    id: "2",
    name: "Transportasi",
    icon: "🚗",
    skills: ["Driver Mobil", "Driver Motor", "Driver Truck", "Kurir", "Operator Forklift"],
  },
  {
    id: "3",
    name: "Teknik",
    icon: "⚡",
    skills: ["Listrik", "Teknisi AC", "Mekanik Motor", "Mekanik Mobil", "Plumber/Pipa"],
  },
  {
    id: "4",
    name: "Pabrik",
    icon: "🏭",
    skills: ["Operator Mesin Jahit", "Operator CNC", "Operator Produksi", "Staff Gudang"],
  },
  {
    id: "5",
    name: "Jasa Rumah Tangga",
    icon: "🏠",
    skills: ["Cleaning Service", "Tukang Kebun", "Handyman", "Security", "Office Boy"],
  },
];

const AdminSkills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(null);
  const [formData, setFormData] = useState({ name: "", icon: "", skills: "" });

  useEffect(() => {
    const stored = localStorage.getItem("cms_skills");
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem("cms_skills", JSON.stringify(defaultCategories));
    }
  }, []);

  const saveCategories = (newCategories: SkillCategory[]) => {
    setCategories(newCategories);
    localStorage.setItem("cms_skills", JSON.stringify(newCategories));
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", icon: "🔧", skills: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (category: SkillCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      skills: category.skills.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const skillsArray = formData.skills.split(",").map((s) => s.trim()).filter(Boolean);
    
    if (!formData.name) {
      toast.error("Nama kategori harus diisi!");
      return;
    }
    
    if (skillsArray.length === 0) {
      toast.error("Minimal 1 keahlian harus diisi!");
      return;
    }

    if (editingCategory) {
      const updated = categories.map((c) =>
        c.id === editingCategory.id
          ? { ...c, name: formData.name, icon: formData.icon, skills: skillsArray }
          : c
      );
      saveCategories(updated);
      toast.success("Kategori berhasil diupdate!");
    } else {
      const newCategory: SkillCategory = {
        id: Date.now().toString(),
        name: formData.name,
        icon: formData.icon,
        skills: skillsArray,
      };
      saveCategories([...categories, newCategory]);
      toast.success("Kategori berhasil ditambahkan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    saveCategories(updated);
    toast.success("Kategori berhasil dihapus!");
  };

  const handleRemoveSkill = (categoryId: string, skillIndex: number) => {
    const updated = categories.map((c) =>
      c.id === categoryId
        ? { ...c, skills: c.skills.filter((_, i) => i !== skillIndex) }
        : c
    );
    saveCategories(updated);
  };

  return (
    <AdminLayout title="Kategori Keahlian">
      <div className="max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Kelola kategori dan daftar keahlian yang tersedia di platform.
          </p>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Kategori
          </Button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="text-2xl">{category.icon}</span>
                    {category.name}
                    <Badge variant="secondary">{category.skills.length} keahlian</Badge>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Kategori?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus kategori "{category.name}"? Semua keahlian di dalam kategori ini akan ikut terhapus.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(category.id)}>
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="gap-1 py-1.5 px-3 cursor-pointer hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors"
                      onClick={() => handleRemoveSkill(category.id, index)}
                    >
                      {skill}
                      <span className="text-xs ml-1">×</span>
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Klik pada badge untuk menghapus keahlian
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {categories.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Tags className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Belum ada kategori</h3>
              <p className="text-muted-foreground mb-4">
                Mulai dengan menambahkan kategori keahlian pertama.
              </p>
              <Button onClick={handleAdd}>Tambah Kategori</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label>Icon</Label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="text-center text-2xl"
                  maxLength={2}
                />
              </div>
              <div className="col-span-3">
                <Label>Nama Kategori</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Konstruksi"
                />
              </div>
            </div>
            <div>
              <Label>Daftar Keahlian</Label>
              <textarea
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Pisahkan dengan koma, contoh: Welder, Tukang Batu, Tukang Kayu"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Pisahkan setiap keahlian dengan koma (,)
              </p>
            </div>
            <Button onClick={handleSave} className="w-full">
              {editingCategory ? "Update Kategori" : "Tambah Kategori"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSkills;
