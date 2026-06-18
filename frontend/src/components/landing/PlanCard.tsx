import { useState } from "react";
import { buildUrl } from "../../services/api";
import type { Plan } from "../../types/plan";
import { formatCurrency } from "../../utils/formatCurrency";

const frequencyLabels: Record<Plan["frequency"], string> = {
  week: "por semana",
  month: "por mês",
  quart: "por trimestre",
  year: "por ano",
};

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        buildUrl("/stripe/create-checkout-session"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ planId: plan.stripePriceId }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="relative flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-7 text-ink shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <h3 className="text-2xl font-black">{plan.name}</h3>

      <div className="mt-8 flex items-end gap-2">
        <span className="text-4xl font-black">
          {formatCurrency(plan.price)}
        </span>
        <span className="pb-1 text-sm text-slate-500">
          {frequencyLabels[plan.frequency]}
        </span>
      </div>
      <div className="mt-2">
        <span className="pb-1 text-sm text-slate-500">{plan.description}</span>
      </div>

      <button
        className="mt-8 rounded-full bg-slate-100 px-5 py-3 text-center text-sm font-bold text-ink transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
        onClick={handleCheckout}
      >
        {isLoading ? "Carregando..." : `Assinar ${plan.name}`}
      </button>
    </article>
  );
}
