import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockJobs } from "@/data/mockData";
import { JobPosting, SKILL_LABELS } from "@/types";
import { toast } from "sonner";

const AdminJobs = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    employerName: "",
    location: "",
    budgetMin: 0,
    budgetMax: 0,
    status: "open" as JobPosting["status"],
  });

  useEffect(() => {
    const stored = localStorage.getItem("cms_jobs");
    if (stored) {
      setJobs(JSON.parse(stored));
    } else {
      setJobs(mockJobs);
      localStorage.setItem("cms_jobs", JSON.stringify(mockJobs));
    }
  }, []);

  const saveJobs = (newJobs: JobPosting[]) => {
    setJobs(newJobs);
    localStorage.setItem("cms_jobs", JSON.stringify(newJobs));
  };

  const handleEdit = (job: JobPosting) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      employerName: job.employerName,
      location: job.location,
      budgetMin: job.budgetMin,
      budgetMax: job.budgetMax,
      status: job.status,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingJob) {
      const updated = jobs.map((j) =>
        j.id === editingJob.id ? { ...j, ...formData } : j
      );
      saveJobs(updated);
      toast.success("Lowongan berhasil diupdate!");
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = jobs.filter((j) => j.id !== id);
    saveJobs(updated);
    toast.success("Lowongan berhasil dihapus!");
  };

  const handleStatusChange = (id: string, status: JobPosting["status"]) => {
    const updated = jobs.map((j) => (j.id === id ? { ...j, status } : j));
    saveJobs(updated);
    toast.success(`Status lowongan diubah ke ${status}!`);
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.employerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: JobPosting["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-100 text-green-700">Aktif</Badge>;
      case "closed":
        return <Badge variant="secondary">Ditutup</Badge>;
      case "filled":
        return <Badge className="bg-blue-100 text-blue-700">Terisi</Badge>;
    }
  };

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
            <h1 className="font-bold text-xl">Kelola Lowongan</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari judul, perusahaan, atau lokasi..."
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
                <TableHead>Judul</TableHead>
                <TableHead>Perusahaan</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Pelamar</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {SKILL_LABELS[job.skillCategory]}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{job.employerName}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    Rp {job.budgetMin.toLocaleString("id-ID")} - {job.budgetMax.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{job.applicationsCount} pelamar</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/lowongan/${job.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Select
                        value={job.status}
                        onValueChange={(value) =>
                          handleStatusChange(job.id, value as JobPosting["status"])
                        }
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Aktif</SelectItem>
                          <SelectItem value="closed">Tutup</SelectItem>
                          <SelectItem value="filled">Terisi</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}>
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
                            <AlertDialogTitle>Hapus Lowongan?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus lowongan "{job.title}"? Tindakan ini
                              tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(job.id)}>
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
          Menampilkan {filteredJobs.length} dari {jobs.length} lowongan
        </p>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Lowongan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Judul Lowongan</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Nama Perusahaan</Label>
              <Input
                value={formData.employerName}
                onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
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
              <Label>Deskripsi</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Budget Min (Rp)</Label>
                <Input
                  type="number"
                  value={formData.budgetMin}
                  onChange={(e) => setFormData({ ...formData, budgetMin: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label>Budget Max (Rp)</Label>
                <Input
                  type="number"
                  value={formData.budgetMax}
                  onChange={(e) => setFormData({ ...formData, budgetMax: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as JobPosting["status"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Aktif</SelectItem>
                  <SelectItem value="closed">Ditutup</SelectItem>
                  <SelectItem value="filled">Terisi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full">
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobs;
