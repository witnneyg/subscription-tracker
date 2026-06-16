import { useEffect } from "react";
import { usePlans } from "../../hooks/usePlans";
import Container from "../ui/Container";
import ErrorState from "../ui/ErrorState";
import LoadingState from "../ui/LoadingState";
import PlanCard from "./PlanCard";

export default function PlansSection() {
  const { plans, isLoading, error, refetch, isUsingFallback } = usePlans();

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return (
    <section className="bg-white py-20" id="plans">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Planos</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">
            Escolha a assinatura ideal para sua jornada.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Beginner mensal, Explorer trimestral e Master anual: uma oferta clara para diferentes ritmos de aprendizado.
          </p>
        </div>

        <div className="mt-12">
          {isLoading ? <LoadingState /> : null}

          {!isLoading && error ? <ErrorState message={error} onRetry={refetch} /> : null}

          {!isLoading ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          ) : null}

          {!isLoading && isUsingFallback ? (
            <p className="mt-6 text-center text-sm text-slate-500">
              Os planos acima são exibidos como fallback enquanto a API não retorna dados ativos.
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
