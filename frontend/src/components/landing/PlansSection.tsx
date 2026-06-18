import { useEffect, useState } from "react";
import type { Plan } from "../../types/plan";
import Container from "../ui/Container";
import ErrorState from "../ui/ErrorState";
import LoadingState from "../ui/LoadingState";
import PlanCard from "./PlanCard";
import { apiFetch } from "../../services/api";

export default function PlansSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasPlans = plans.length > 0;

  const fetchPlans = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const apiPlans = await apiFetch<Plan[]>("/stripe/plans");
      setPlans(apiPlans);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os planos.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchPlans();
  }, []);

  return (
    <section className="bg-white py-20" id="plans">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            Planos
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-ink md:text-5xl">
            Escolha a assinatura ideal para sua jornada.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Escolha entre os planos disponíveis e encontre a assinatura ideal
            para o seu ritmo de aprendizado.
          </p>
        </div>

        <div className="mt-12">
          {isLoading ? <LoadingState /> : null}

          {!isLoading && error ? (
            <ErrorState message={error} onRetry={fetchPlans} />
          ) : null}

          {!isLoading && !error && hasPlans ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard key={plan.stripePriceId} plan={plan} />
              ))}
            </div>
          ) : null}

          {!isLoading && !error && !hasPlans ? (
            <p className="mt-8 text-center text-sm text-slate-500">
              Nenhum plano disponível no momento.
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
