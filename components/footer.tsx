import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-amber-400">Carvalho</div>
              <div className="text-2xl font-light text-white">Móveis</div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transformando casas em lares com móveis de qualidade e design exclusivo desde 2020. Qualidade, conforto e
              elegância em cada peça.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/carvalhomoveis4234/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-amber-600 hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Santa Maria
                  <br />
                  Brasília - DF
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <a href="tel:+5561998605145" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                  (61) 99860-5145
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400 flex-shrink-0" />
                <a
                  href="mailto:contato@carvalhomoveis.com"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                >
                  contato@carvalhomoveis.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Seg - Sex: 8h às 18h
                  <br />
                  Sáb: 8h às 12h
                  <br/>
                  Dom: Fechado
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2020 Carvalho Móveis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
