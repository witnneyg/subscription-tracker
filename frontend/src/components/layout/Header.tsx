import Container from "../ui/Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <a className="flex items-center gap-3 font-bold text-ink" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white">CF</span>
          <span>CourseFlow</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-ink" href="#features">Recursos</a>
          <a className="transition hover:text-ink" href="#plans">Planos</a>
          <a className="transition hover:text-ink" href="#contact">Contato</a>
        </nav>

        <a
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          href="#plans"
        >
          Ver planos
        </a>
      </Container>
    </header>
  );
}
