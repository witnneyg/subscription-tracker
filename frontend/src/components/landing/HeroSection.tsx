import Button from "../ui/Button";
import Container from "../ui/Container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-slate-50 py-24 sm:py-28">
      <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-100 blur-3xl" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
            Subscription moderna para cursos online
          </p>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Aprenda mais, organize melhor e renove sem complicação.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Uma landing page simples e profissional para vender planos de cursos por assinatura,
            com opções mensal, trimestral e anual conectadas à sua API.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#plans">Conhecer planos</Button>
            <Button href="#features" variant="secondary">Ver recursos</Button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/80 p-4 shadow-soft backdrop-blur">
          <div className="rounded-[1.5rem] bg-ink p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-brand-100">Dashboard</span>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200">
                Online
              </span>
            </div>
            <div className="mt-8 space-y-4">
              {["Beginner", "Explorer", "Master"].map((plan, index) => (
                <div className="rounded-2xl bg-white/10 p-4" key={plan}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{plan}</span>
                    <span className="text-sm text-slate-300">{index + 8} cursos</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-brand-500"
                      style={{ width: `${52 + index * 16}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
