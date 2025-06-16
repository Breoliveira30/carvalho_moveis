export default function SobrePage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Sobre Nós</h1>

        <div className="bg-white rounded-xl shadow-md p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Nossa Missão</h2>
          <div className="mb-6 flex justify-center">
            <div className="relative inline-block">
              <span className="text-3xl font-bold tracking-tight text-amber-800">Carvalho</span>
              <span className="text-3xl font-light italic tracking-wide ml-2 text-amber-700">Móveis</span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500"></div>
            </div>
          </div>

          <p className="text-lg text-amber-700 mb-6">
            Na Carvalho Móveis, nossa missão é levar conforto para as pessoas com móveis aconchegantes e de altíssima
            qualidade. Acreditamos que um lar bem decorado e confortável é essencial para o bem-estar e a qualidade de
            vida.
          </p>
          <p className="text-lg text-amber-700 mb-6">
            Trabalhamos com os melhores materiais e artesãos para garantir que cada peça que sai de nossa loja seja
            durável, bonita e, acima de tudo, confortável. Nosso compromisso é com a satisfação do cliente e com a
            excelência em tudo o que fazemos.
          </p>
          <p className="text-lg text-amber-700">
            Fundada por João Victor de Carvalho em 2020, a Carvalho Móveis tem se destacado no mercado por oferecer
            produtos de alta qualidade a preços justos, sempre com atendimento personalizado e focado nas necessidades
            de cada cliente.
          </p>
        </div>

        <div className="bg-amber-100 rounded-xl p-8 max-w-4xl mx-auto wood-slats-vertical">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">Nossos Valores</h2>
          <ul className="space-y-4">
            {values.map((value, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-amber-800 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-1">{value.title}</h3>
                  <p className="text-amber-700">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

const values = [
  {
    title: "Qualidade",
    description:
      "Utilizamos apenas materiais de primeira linha e técnicas de fabricação que garantem a durabilidade e beleza de nossos produtos.",
  },
  {
    title: "Conforto",
    description:
      "Cada móvel é projetado pensando no conforto e bem-estar de quem vai utilizá-lo, com ergonomia e acabamento impecáveis.",
  },
  {
    title: "Sustentabilidade",
    description:
      "Comprometidos com o meio ambiente, utilizamos madeira de reflorestamento e processos de produção que minimizam o impacto ambiental.",
  },
  {
    title: "Atendimento Personalizado",
    description:
      "Entendemos que cada cliente tem necessidades únicas, por isso oferecemos um atendimento personalizado e consultivo.",
  },
]
