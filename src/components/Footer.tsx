import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-kerjain-gray-900 text-kerjain-gray-300">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="lg" className="text-white [&>span:first-child]:text-white [&>span:last-child]:text-kerjain-green-500" />
            <p className="mt-4 text-sm leading-relaxed">
              Platform skill-to-job matching untuk blue-collar workers di Indonesia. 
              Menghubungkan pekerja terampil dengan pemberi kerja terpercaya.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-kerjain-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-kerjain-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-kerjain-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/cari-pekerja" className="hover:text-white transition-colors">
                  Cari Pekerja
                </Link>
              </li>
              <li>
                <Link to="/lowongan" className="hover:text-white transition-colors">
                  Lowongan Kerja
                </Link>
              </li>
              <li>
                <Link to="/daftar" className="hover:text-white transition-colors">
                  Daftar Sebagai Pekerja
                </Link>
              </li>
              <li>
                <Link to="/daftar-employer" className="hover:text-white transition-colors">
                  Daftar Sebagai Pemberi Kerja
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Bantuan</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/tentang" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/syarat-ketentuan" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="/kebijakan-privasi" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>halo@kerjain.id</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-kerjain-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2026 KERJAIN.ID. Hak cipta dilindungi undang-undang.
          </p>
          <p className="text-sm text-kerjain-gray-500">
            Dibuat dengan ❤️ untuk pekerja Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
