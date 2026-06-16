import { Link } from "react-router-dom";
import Container from "../components/ui/Container";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 py-20">
      <Container className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">404</p>
        <h1 className="mt-4 text-5xl font-black text-ink">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          A rota acessada não existe. Volte para a landing page e confira os planos disponíveis.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          to="/"
        >
          Voltar ao início
        </Link>
      </Container>
    </main>
  );
}
