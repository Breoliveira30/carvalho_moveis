import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, Users, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Image
              src="/carvalho-logo.jpg"
              alt="Carvalho Móveis Logo"
              width={200}
              height={200}
              className="mx-auto rounded-full shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre a Carvalho Móveis</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Há anos transformando casas em lares aconchegantes com móveis de qualidade excepcional
          </p>
        </div>

        {/* Nossa História */}
        <section className="mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A Carvalho Móveis nasceu da paixão por criar ambientes únicos e acolhedores. Começamos como uma pequena
                empresa familiar com o sonho de oferecer móveis de qualidade com preços justos.
              </p>
              <p>
                Ao longo dos anos, crescemos mantendo nossos valores fundamentais: qualidade, confiabilidade e
                atendimento personalizado. Cada móvel que oferecemos é cuidadosamente selecionado pensando no conforto e
                bem-estar de nossos clientes.
              </p>
              <p>
                Hoje, somos referência em móveis de qualidade em Brasília e região, sempre comprometidos em transformar
                sua casa no lar dos seus sonhos.
              </p>
            </div>
          </div>
        </section>

        {/* Nossos Valores */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho e relacionamento com os clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Qualidade</h3>
              <p className="text-gray-600">Selecionamos apenas móveis com os melhores materiais e acabamentos</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Atendimento</h3>
              <p className="text-gray-600">Atendimento personalizado e dedicado para cada cliente</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Confiança</h3>
              <p className="text-gray-600">Transparência e honestidade em todas as nossas relações</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paixão</h3>
              <p className="text-gray-600">Amor pelo que fazemos e dedicação em cada projeto</p>
            </div>
          </div>
        </section>

        {/* Nossa Missão */}
        <section className="mb-16 bg-amber-50 rounded-lg p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
              "Transformar casas em lares aconchegantes, oferecendo móveis de qualidade excepcional com preços justos,
              sempre priorizando a satisfação e o bem-estar de nossos clientes."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-800 mb-2">500+</div>
                <p className="text-gray-600">Clientes Satisfeitos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-800 mb-2">5+</div>
                <p className="text-gray-600">Anos de Experiência</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-800 mb-2">100%</div>
                <p className="text-gray-600">Garantia de Qualidade</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-amber-800 text-white rounded-lg p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Pronto para conhecer nossos móveis?</h2>
            <p className="text-xl mb-8 text-amber-100">
              Descubra nossa coleção completa e encontre o móvel perfeito para sua casa
            </p>
            <Link
              href="/produtos"
              className="inline-flex items-center gap-2 bg-white text-amber-800 hover:bg-amber-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Ver Produtos
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
