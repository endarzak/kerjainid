import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react";
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
import AdminLayout from "@/components/admin/AdminLayout";
import { mockArticles, Article } from "@/pages/Articles";
import { toast } from "sonner";

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    author: "Tim QERDJAIN.ID",
    readTime: 5,
    tags: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("cms_articles");
    if (stored) {
      setArticles(JSON.parse(stored));
    } else {
      setArticles(mockArticles);
      localStorage.setItem("cms_articles", JSON.stringify(mockArticles));
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem("cms_articles", JSON.stringify(newArticles));
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage,
      category: article.category,
      author: article.author,
      readTime: article.readTime,
      tags: article.tags.join(", "),
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      author: "Tim QERDJAIN.ID",
      readTime: 5,
      tags: "",
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const articleData = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    if (editingArticle) {
      const updated = articles.map((a) =>
        a.id === editingArticle.id ? { ...a, ...articleData } : a
      );
      saveArticles(updated);
      toast.success("Artikel berhasil diupdate!");
    } else {
      const newArticle: Article = {
        id: Date.now().toString(),
        ...articleData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveArticles([...articles, newArticle]);
      toast.success("Artikel baru berhasil dipublikasikan!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = articles.filter((a) => a.id !== id);
    saveArticles(updated);
    toast.success("Artikel berhasil dihapus!");
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Kelola Artikel">
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari judul atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Tulis Artikel
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artikel</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium line-clamp-1">{article.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} menit baca
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{article.category}</Badge>
                </TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/artikel/${article.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
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
                          <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus artikel "{article.title}"? Tindakan ini
                            tidak dapat dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(article.id)}>
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
        Menampilkan {filteredArticles.length} dari {articles.length} artikel
      </p>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? "Edit Artikel" : "Tulis Artikel Baru"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Judul</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Masukkan judul artikel"
              />
            </div>
            <div>
              <Label>Slug URL (opsional, akan di-generate otomatis)</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="tips-sukses-welder-profesional"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Kategori</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Karir, Tips, Sertifikasi, dll"
                />
              </div>
              <div>
                <Label>Waktu Baca (menit)</Label>
                <Input
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label>URL Cover Image</Label>
              <Input
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div>
              <Label>Excerpt (ringkasan singkat)</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Ringkasan artikel dalam 1-2 kalimat"
                rows={2}
              />
            </div>
            <div>
              <Label>Konten (gunakan ## untuk heading, - untuk list)</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Tulis konten artikel di sini..."
                rows={10}
              />
            </div>
            <div>
              <Label>Tags (pisahkan dengan koma)</Label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="welder, sertifikasi, karir, tips"
              />
            </div>
            <Button onClick={handleSave} className="w-full">
              {editingArticle ? "Update Artikel" : "Publikasikan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminArticles;
