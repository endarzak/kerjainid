import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Search, MoreVertical, Eye, Edit, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EmployerLayout from "@/components/employer/EmployerLayout";
import { useToast } from "@/hooks/use-toast";

const mockJobs = [
  { id: "1", title: "Dicari Welder untuk Proyek Gedung", applicants: 12, views: 89, status: "active", createdAt: "20 Jan 2024", location: "Jakarta Selatan" },
  { id: "2", title: "Driver Truck untuk Antar Barang", applicants: 8, views: 56, status: "active", createdAt: "22 Jan 2024", location: "Tangerang" },
  { id: "3", title: "Teknisi AC untuk Maintenance", applicants: 7, views: 42, status: "active", createdAt: "21 Jan 2024", location: "Bekasi" },
  { id: "4", title: "Tukang Kayu untuk Furniture Custom", applicants: 15, views: 120, status: "closed", createdAt: "10 Jan 2024", location: "Depok" },
];

const ManageJobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);

  const filteredJobs = jobs.filter((job) => job.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDeleteJob = () => {
    if (deleteJobId) {
      setJobs(jobs.filter((job) => job.id !== deleteJobId));
      toast({ title: "Lowongan Dihapus", description: "Lowongan berhasil dihapus dari daftar" });
      setDeleteJobId(null);
    }
  };

  const handleToggleStatus = (jobId: string) => {
    setJobs(jobs.map((job) => job.id === jobId ? { ...job, status: job.status === "active" ? "closed" : "active" } : job));
    toast({ title: "Status Diperbarui", description: "Status lowongan berhasil diperbarui" });
  };

  return (
    <EmployerLayout title="Kelola Lowongan">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <p className="text-muted-foreground">{jobs.filter((j) => j.status === "active").length} lowongan aktif</p>
        <Button asChild>
          <Link to="/dashboard/employer/lowongan/baru"><PlusCircle className="mr-2 h-4 w-4" />Pasang Lowongan Baru</Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari lowongan..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground">Lowongan</th>
                <th className="text-left py-4 px-6 font-medium text-muted-foreground hidden md:table-cell">Lokasi</th>
                <th className="text-center py-4 px-6 font-medium text-muted-foreground">Pelamar</th>
                <th className="text-center py-4 px-6 font-medium text-muted-foreground hidden sm:table-cell">Views</th>
                <th className="text-center py-4 px-6 font-medium text-muted-foreground">Status</th>
                <th className="text-center py-4 px-6 font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-muted/30">
                  <td className="py-4 px-6">
                    <p className="font-medium text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground md:hidden">{job.location}</p>
                    <p className="text-xs text-muted-foreground">{job.createdAt}</p>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell text-muted-foreground">{job.location}</td>
                  <td className="py-4 px-6 text-center"><div className="flex items-center justify-center gap-1"><Users className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{job.applicants}</span></div></td>
                  <td className="py-4 px-6 text-center hidden sm:table-cell"><div className="flex items-center justify-center gap-1"><Eye className="h-4 w-4 text-muted-foreground" /><span>{job.views}</span></div></td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={job.status === "active" ? "default" : "secondary"} className="cursor-pointer" onClick={() => handleToggleStatus(job.id)}>
                      {job.status === "active" ? "Aktif" : "Ditutup"}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/employer/lowongan/${job.id}`)}><Eye className="mr-2 h-4 w-4" />Lihat Detail</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/dashboard/employer/lowongan/${job.id}/edit`)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => setDeleteJobId(job.id)}><Trash2 className="mr-2 h-4 w-4" />Hapus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredJobs.length === 0 && <div className="py-12 text-center"><p className="text-muted-foreground">Tidak ada lowongan ditemukan</p></div>}
      </div>

      <AlertDialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Hapus Lowongan?</AlertDialogTitle><AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={handleDeleteJob}>Hapus</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </EmployerLayout>
  );
};

export default ManageJobs;
