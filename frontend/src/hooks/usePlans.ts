import { useCallback, useMemo, useState } from "react";
import { getPlans } from "../services/plans";
import type { LandingPlan, Plan, PlanFrequency } from "../types/plan";

const planCopyByFrequency: Record<PlanFrequency, Omit<LandingPlan, "id" | "price">> = {
  weekly: {
    name: "Starter",
    frequency: "weekly",
    description: "Para testar a rotina de aprendizado com aulas essenciais.",
    features: ["Acesso semanal", "Aulas introdutórias", "Trilha base"],
  },
  monthly: {
    name: "Beginner",
    frequency: "monthly",
    description: "Ideal para começar uma nova habilidade com consistência mensal.",
    features: ["Cursos essenciais", "Renovação mensal", "Suporte da comunidade"],
  },
  quarterly: {
    name: "Explorer",
    frequency: "quarterly",
    description: "Perfeito para explorar trilhas completas e acelerar sua evolução.",
    features: ["Trilhas avançadas", "Projetos práticos", "Renovação trimestral"],
    badge: "Mais flexível",
    highlighted: true,
  },
  yearly: {
    name: "Master",
    frequency: "yearly",
    description: "Para dominar conteúdos premium com o melhor custo-benefício anual.",
    features: ["Catálogo completo", "Mentorias exclusivas", "Renovação anual"],
    badge: "Melhor valor",
  },
};

export const fallbackPlans: LandingPlan[] = [
  {
    id: "beginner",
    ...planCopyByFrequency.monthly,
    price: 49,
  },
  {
    id: "explorer",
    ...planCopyByFrequency.quarterly,
    price: 129,
  },
  {
    id: "master",
    ...planCopyByFrequency.yearly,
    price: 399,
  },
];

function mapApiPlanToLandingPlan(plan: Plan): LandingPlan {
  const copy = planCopyByFrequency[plan.frequency];

  return {
    id: plan._id,
    ...copy,
    name: copy.name,
    price: plan.price,
  };
}

export function usePlans() {
  const [apiPlans, setApiPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const plans = await getPlans();
      setApiPlans(plans.filter((plan) => plan.active));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível carregar os planos.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const plans = useMemo(() => {
    const supportedPlans = apiPlans
      .filter((plan) => ["monthly", "quarterly", "yearly"].includes(plan.frequency))
      .map(mapApiPlanToLandingPlan);

    return supportedPlans.length > 0 ? supportedPlans : fallbackPlans;
  }, [apiPlans]);

  return {
    plans,
    isLoading,
    error,
    refetch: fetchPlans,
    isUsingFallback: apiPlans.length === 0,
  };
}
