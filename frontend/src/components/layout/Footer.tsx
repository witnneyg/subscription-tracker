import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <Container className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} CourseFlow. Aprendizado por assinatura.</p>
        <p>Planos flexíveis para evoluir no seu ritmo.</p>
      </Container>
    </footer>
  );
}
