import { Phone, Mail, Instagram } from "lucide-react"
import Link from "next/link"

export default function ContatoPage() {
  return (
    <main className="py-6 sm:py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 mb-6 sm:mb-8 text-center leading-tight">
          Entre em Contato
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Informações de Contato */}
            <div className="bg-amber-100 rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-800 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">Telefone/WhatsApp</h3>
                    <Link
                      href="https://wa.me/5561998605145"
                      target="_blank"
                      className="text-amber-700 hover:text-amber-500 transition-colors text-base sm:text-lg font-medium"
                    >
                      (61) 99860-5145
                    </Link>
                    <p className="text-sm text-amber-600 mt-1">Clique para falar conosco no WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-800 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">E-mail</h3>
                    <a
                      href="mailto:carvalhomoveis@gmail.com"
                      className="text-amber-700 hover:text-amber-500 transition-colors text-base sm:text-lg font-medium"
                    >
                      carvalhomoveis@gmail.com
                    </a>
                    <p className="text-sm text-amber-600 mt-1">Envie sua dúvida por e-mail</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-800 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">Instagram</h3>
                    <Link
                      href="https://www.instagram.com/carvalhomoveis4234?igsh=MWdob2Y0MWgzN200Zg=="
                      target="_blank"
                      className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm sm:text-base transition-colors inline-flex items-center gap-2 font-medium"
                    >
                      <Instagram size={18} />
                      @carvalhomoveis4234
                    </Link>
                    <p className="text-sm text-amber-600 mt-2">Siga-nos para ver nossos produtos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horário de Atendimento e Informações Adicionais */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6">Horário de Atendimento</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-amber-100">
                    <span className="font-medium text-amber-800">Segunda a Sexta:</span>
                    <span className="text-amber-700">9h às 18h</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-amber-100">
                    <span className="font-medium text-amber-800">Sábado:</span>
                    <span className="text-amber-700">9h às 13h</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="font-medium text-amber-800">Domingo:</span>
                    <span className="text-amber-700">Fechado</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6">Nossos Serviços</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-amber-700">Entrega em toda a região</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-amber-700">Montagem profissional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-amber-700">Garantia em todos os produtos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-amber-700">Parcelamento em até 12x</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="bg-green-50 p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-4">Pronto para transformar seu lar?</h3>
              <p className="text-green-700 mb-6 text-base sm:text-lg">
                Entre em contato conosco e descubra como nossos móveis podem trazer mais conforto e elegância para sua
                casa.
              </p>
              <Link
                href="https://wa.me/5561998605145?text=Olá! Gostaria de conhecer os móveis da Carvalho Móveis."
                target="_blank"
                className="inline-flex bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium items-center gap-3 transition-colors text-base sm:text-lg touch-manipulation"
              >
                <Phone size={20} />
                Falar no WhatsApp Agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
