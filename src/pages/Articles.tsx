import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  authorAvatar?: string;
  readTime: number;
  createdAt: string;
  tags: string[];
}

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Tips Sukses Menjadi Welder Profesional dengan Sertifikasi",
    slug: "tips-sukses-welder-profesional",
    excerpt: "Pelajari langkah-langkah menjadi welder profesional yang dicari banyak perusahaan. Dari pelatihan hingga sertifikasi yang dibutuhkan.",
    content: `
## Mengapa Menjadi Welder Profesional?

Profesi welder atau juru las merupakan salah satu pekerjaan blue-collar yang paling banyak dicari di Indonesia. Dengan perkembangan industri konstruksi dan manufaktur, kebutuhan akan welder terampil terus meningkat.

### Langkah-langkah Menjadi Welder Profesional

1. **Mulai dari Dasar**: Pelajari teknik-teknik dasar pengelasan seperti SMAW, GMAW, dan GTAW.

2. **Ikuti Pelatihan Bersertifikat**: Daftarkan diri di lembaga pelatihan kerja yang terakreditasi untuk mendapatkan sertifikasi resmi.

3. **Praktik Terus-menerus**: Latihan adalah kunci. Semakin banyak jam terbang, semakin mahir skill Anda.

4. **Pahami Keselamatan Kerja**: Welder harus memahami K3 (Keselamatan dan Kesehatan Kerja) untuk melindungi diri sendiri dan rekan kerja.

### Sertifikasi yang Dibutuhkan

- Sertifikasi BNSP (Badan Nasional Sertifikasi Profesi)
- Sertifikasi AWS (American Welding Society) untuk proyek internasional
- Sertifikasi K3 Khusus Pengelasan

### Tips Meningkatkan Karir

- Bangun portfolio hasil kerja
- Daftar di platform seperti QERDJAIN.ID untuk mendapatkan pekerjaan
- Terus update skill dengan teknologi terbaru

Dengan dedikasi dan pelatihan yang tepat, Anda bisa menjadi welder profesional dengan penghasilan yang menjanjikan.
    `,
    coverImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
    category: "Karir",
    author: "Tim QERDJAIN.ID",
    readTime: 5,
    createdAt: "2024-01-15",
    tags: ["welder", "sertifikasi", "karir", "tips"],
  },
  {
    id: "2",
    title: "Panduan Lengkap Mencari Pekerja Terampil untuk Proyek Anda",
    slug: "panduan-mencari-pekerja-terampil",
    excerpt: "Temukan cara efektif mencari dan merekrut pekerja terampil untuk proyek konstruksi, manufaktur, dan bidang lainnya.",
    content: `
## Mencari Pekerja Terampil dengan Efektif

Menemukan pekerja terampil yang tepat adalah tantangan bagi banyak pemberi kerja. Artikel ini akan memandu Anda menemukan talenta terbaik.

### Tentukan Kebutuhan dengan Jelas

Sebelum mencari pekerja, pastikan Anda sudah:
- Mendefinisikan scope pekerjaan dengan detail
- Menentukan skill yang dibutuhkan
- Menetapkan budget yang realistis
- Menentukan durasi proyek

### Gunakan Platform Digital

Platform seperti QERDJAIN.ID memudahkan Anda:
- Mencari pekerja berdasarkan skill spesifik
- Melihat rating dan review dari employer sebelumnya
- Memverifikasi sertifikasi dan pengalaman
- Menghubungi pekerja secara langsung

### Tips Wawancara Pekerja Blue-Collar

1. Fokus pada pengalaman praktis, bukan teori
2. Minta portfolio atau foto hasil kerja
3. Cek referensi dari proyek sebelumnya
4. Diskusikan ekspektasi dengan jelas

### Pertimbangan Penting

- Selalu verifikasi identitas pekerja
- Buat kontrak kerja yang jelas
- Sediakan peralatan keselamatan yang memadai
- Komunikasikan timeline dengan transparan

Dengan pendekatan yang sistematis, Anda akan menemukan pekerja terampil yang sesuai dengan kebutuhan proyek Anda.
    `,
    coverImage: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800",
    category: "Tips Employer",
    author: "Tim QERDJAIN.ID",
    readTime: 4,
    createdAt: "2024-01-20",
    tags: ["employer", "rekrutmen", "tips", "proyek"],
  },
  {
    id: "3",
    title: "Keuntungan Memiliki Sertifikasi K3 untuk Pekerja Lapangan",
    slug: "keuntungan-sertifikasi-k3",
    excerpt: "Sertifikasi K3 bukan hanya kewajiban, tapi juga investasi karir. Pelajari manfaatnya untuk pekerja lapangan.",
    content: `
## Pentingnya Sertifikasi K3

Keselamatan dan Kesehatan Kerja (K3) adalah aspek yang tidak bisa diabaikan dalam dunia kerja, terutama bagi pekerja lapangan.

### Apa itu Sertifikasi K3?

Sertifikasi K3 adalah bukti kompetensi seseorang dalam menerapkan prinsip-prinsip keselamatan kerja. Sertifikasi ini dikeluarkan oleh lembaga yang terakreditasi.

### Manfaat Memiliki Sertifikasi K3

**Untuk Pekerja:**
- Meningkatkan nilai jual di pasar kerja
- Gaji lebih tinggi dibanding pekerja tanpa sertifikasi
- Lebih diprioritaskan oleh employer
- Pemahaman yang lebih baik tentang risiko kerja

**Untuk Employer:**
- Mengurangi risiko kecelakaan kerja
- Memenuhi regulasi pemerintah
- Meningkatkan produktivitas
- Menurunkan biaya asuransi

### Jenis Sertifikasi K3

1. K3 Umum
2. K3 Konstruksi
3. K3 Listrik
4. K3 Pengelasan
5. K3 Ketinggian

### Cara Mendapatkan Sertifikasi

1. Daftar di lembaga pelatihan terakreditasi
2. Ikuti pelatihan sesuai bidang
3. Lulus ujian kompetensi
4. Dapatkan sertifikat resmi

Investasikan waktu dan biaya untuk mendapatkan sertifikasi K3. Ini akan membuka lebih banyak peluang karir!
    `,
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
    category: "Sertifikasi",
    author: "Tim QERDJAIN.ID",
    readTime: 6,
    createdAt: "2024-01-25",
    tags: ["K3", "sertifikasi", "keselamatan", "karir"],
  },
  {
    id: "4",
    title: "Cara Membuat Portfolio yang Menarik untuk Pekerja Blue-Collar",
    slug: "cara-membuat-portfolio-menarik",
    excerpt: "Portfolio bukan hanya untuk profesional kantoran. Pelajari cara membuat portfolio yang menarik perhatian employer.",
    content: `
## Portfolio untuk Pekerja Blue-Collar

Banyak pekerja blue-collar tidak menyadari pentingnya portfolio. Padahal, portfolio adalah cara terbaik menunjukkan kemampuan Anda.

### Mengapa Portfolio Penting?

- Bukti nyata kemampuan Anda
- Membedakan Anda dari kompetitor
- Meningkatkan kepercayaan employer
- Memudahkan negosiasi gaji

### Apa yang Harus Ada di Portfolio?

1. **Foto Hasil Kerja**: Dokumentasikan setiap proyek yang Anda kerjakan
2. **Video Proses Kerja**: Tunjukkan teknik dan keterampilan Anda
3. **Deskripsi Proyek**: Jelaskan detail pekerjaan yang dilakukan
4. **Testimonial**: Minta review dari employer sebelumnya

### Tips Membuat Portfolio Digital

- Gunakan platform seperti QERDJAIN.ID untuk upload portfolio
- Pastikan foto berkualitas tinggi dan jelas
- Tambahkan caption yang informatif
- Update secara berkala dengan proyek terbaru

### Contoh Portfolio yang Baik

**Untuk Welder:**
- Foto hasil las dari berbagai sudut
- Video proses pengelasan
- Sertifikat pelatihan

**Untuk Tukang Bangunan:**
- Foto before-after renovasi
- Dokumentasi tahapan pengerjaan
- Testimoni pemilik rumah

Mulai dokumentasikan pekerjaan Anda hari ini!
    `,
    coverImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
    category: "Tips Pekerja",
    author: "Tim QERDJAIN.ID",
    readTime: 4,
    createdAt: "2024-01-28",
    tags: ["portfolio", "tips", "pekerja", "karir"],
  },
];

const Articles = () => {
  const categories = [...new Set(mockArticles.map((a) => a.category))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="bg-primary py-12 md:py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Artikel & Tips
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Pelajari tips karir, panduan sertifikasi, dan insight seputar dunia kerja blue-collar
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="cursor-pointer">
                Semua
              </Badge>
              {categories.map((cat) => (
                <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-muted">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              <Link to={`/artikel/${mockArticles[0].slug}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <img
                    src={mockArticles[0].coverImage}
                    alt={mockArticles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="mb-2">{mockArticles[0].category}</Badge>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      {mockArticles[0].title}
                    </h2>
                  </div>
                </div>
              </Link>

              <div className="space-y-4">
                {mockArticles.slice(1, 4).map((article) => (
                  <Link
                    key={article.id}
                    to={`/artikel/${article.slug}`}
                    className="flex gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {article.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime} menit baca
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.createdAt).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-8 md:py-12 bg-muted/50">
          <div className="container">
            <h2 className="text-2xl font-bold text-foreground mb-6">Semua Artikel</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/artikel/${article.slug}`}
                  className="card-elevated overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} menit
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Articles;
