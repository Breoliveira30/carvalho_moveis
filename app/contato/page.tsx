"use client"

import { Phone, Instagram, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de saber mais sobre os móveis disponíveis."
    const whatsappUrl = `https://wa.me/5561998605145?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/carvalhomoveis4234/", "_blank")
  }

  const handleEmailClick = () => {
    window.location.href = "mailto:carvalhomoveis@gmail.com"
  }

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aqui para ajudar você a encontrar os móveis perfeitos para sua casa
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informações de Contato */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fale Conosco</h2>
              <p className="text-gray-600 mb-8">
                Entre em contato conosco através dos canais abaixo. Estamos prontos para atendê-lo!
              </p>
            </div>

            <div className="space-y-6">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors w-full text-left"
              >
                <div className="bg-green-600 text-white p-3 rounded-full">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600">(61) 99860-5145</p>
                  <p className="text-sm text-green-600">Clique para conversar</p>
                </div>
              </button>

              <button
                onClick={handleInstagramClick}
                className="flex items-center gap-4 p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors w-full text-left"
              >
                <div className="bg-pink-600 text-white p-3 rounded-full">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Instagram</h3>
                  <p className="text-gray-600">@carvalhomoveis4234</p>
                  <p className="text-sm text-pink-600">Siga-nos para novidades</p>
                </div>
              </button>

              <button
                onClick={handleEmailClick}
                className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors w-full text-left"
              >
                <div className="bg-blue-600 text-white p-3 rounded-full">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">carvalhomoveis@gmail.com</p>
                  <p className="text-sm text-blue-600">Clique para enviar email</p>
                </div>
              </button>

              <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
                <div className="bg-amber-600 text-white p-3 rounded-full">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Localização</h3>
                  <p className="text-gray-600">Brasília, DF</p>
                  <p className="text-sm text-amber-600">Atendemos toda a região</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-gray-600 text-white p-3 rounded-full">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
                  <p className="text-gray-600">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-gray-600">Sábado: 8h às 12h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-amber-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pronto para transformar sua casa?</h2>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para ajudar você a escolher os móveis perfeitos. Entre em contato conosco pelo
              WhatsApp e receba atendimento personalizado!
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg hover:shadow-xl mb-6"
            >
              <Phone size={24} />
              Conversar no WhatsApp
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Ou siga-nos nas redes sociais:</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleInstagramClick}
                  className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors"
                >
                  <Instagram size={20} />
                </button>
                <button
                  onClick={handleEmailClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                >
                  <Mail size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
