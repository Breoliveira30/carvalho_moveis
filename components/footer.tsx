import Link from "next/link"
import { Instagram, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-50 py-8 border-t border-amber-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold tracking-tight text-amber-50">Carvalho</span>
              <span className="text-xl font-light italic tracking-wide ml-2 text-amber-100">Móveis</span>
              <div className="w-24 h-0.5 bg-amber-400 mt-2"></div>
            </div>
            <p className="mb-2">Transformando casas em lares desde 2020.</p>
            <p>Qualidade, conforto e elegância para seu lar.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-amber-200 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-amber-200 transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-amber-200 transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-amber-200 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <Link
                  href="https://wa.me/5561998605145"
                  target="_blank"
                  className="hover:text-amber-200 transition-colors"
                >
                  (61) 99860-5145
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:carvalhomoveis@gmail.com" className="hover:text-amber-200 transition-colors">
                  carvalhomoveis@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={16} />
                <Link
                  href="https://www.instagram.com/carvalhomoveis4234?igsh=MWdob2Y0MWgzN200Zg=="
                  target="_blank"
                  className="bg-amber-700 hover:bg-amber-600 text-white px-3 py-1 rounded-md text-sm transition-colors inline-flex items-center gap-1"
                >
                  <Instagram size={14} />
                  @carvalhomoveis4234
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-amber-800 text-center text-sm">
          <p>© {new Date().getFullYear()} Carvalho Móveis. Todos os direitos reservados.</p>
          <p className="mt-2">
            Desenvolvido por{" "}
            <a href="mailto:BrennoOliveirq@outlook.com" className="font-medium hover:text-amber-200 transition-colors">
              Dev-Brenno (BrennoOliveirq@outlook.com)
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
