import Container from "../ui/Container";

const features = [
  {
    title: "Planos flexíveis",
    description:
      "Escolha ciclos mensal, trimestral ou anual para cada perfil de estudante.",
  },
  {
    title: "Cursos organizados",
    description:
      "Apresente trilhas de aprendizado com uma experiência clara e focada.",
  },
  {
    title: "Renovação previsível",
    description:
      "Conecte a landing à API e mantenha preços e planos sincronizados.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-20" id="features">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Recursos
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-ink">
            Tudo que uma assinatura de cursos precisa para começar bem.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              key={feature.title}
            >
              <div className="mb-6 h-12 w-12 rounded-2xl bg-brand-100" />
              <h3 className="text-xl font-bold text-ink">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
