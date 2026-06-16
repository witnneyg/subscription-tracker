import { useEffect, useState } from "react";
import type { LandingPlan } from "../../types/plan";
import { formatCurrency } from "../../utils/formatCurrency";

const frequencyLabels: Record<LandingPlan["frequency"], string> = {
  weekly: "por semana",
  monthly: "por mês",
  quarterly: "por trimestre",
  yearly: "por ano",
};

interface PlanCardProps {
  plan: LandingPlan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const [isLoadng, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:3000/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId: "price_1TikNzRppJDGpb056T0kPfUm" }),
        },
      );

      console.log("Response from backend:", response);

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      console.log(data, "Data from backend");

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
    <article
      className={`relative flex h-full flex-col rounded-[2rem] border p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
        plan.highlighted
          ? "border-ink bg-ink text-white"
          : "border-slate-200 bg-white text-ink"
      }`}
    >
      {plan.badge ? (
        <span
          className={`absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-bold ${
            plan.highlighted
              ? "bg-brand-500 text-white"
              : "bg-brand-100 text-brand-700"
          }`}
        >
          {plan.badge}
        </span>
      ) : null}

      <h3 className="text-2xl font-black">{plan.name}</h3>
      <p
        className={`mt-3 min-h-14 leading-7 ${plan.highlighted ? "text-slate-300" : "text-slate-600"}`}
      >
        {plan.description}
      </p>

      <div className="mt-8 flex items-end gap-2">
        <span className="text-4xl font-black">
          {formatCurrency(plan.price)}
        </span>
        <span
          className={`pb-1 text-sm ${plan.highlighted ? "text-slate-300" : "text-slate-500"}`}
        >
          {frequencyLabels[plan.frequency]}
        </span>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {plan.features.map((feature) => (
          <li className="flex items-start gap-3" key={feature}>
            <span
              className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs ${
                plan.highlighted
                  ? "bg-white text-ink"
                  : "bg-brand-100 text-brand-700"
              }`}
            >
              ✓
            </span>
            <span
              className={plan.highlighted ? "text-slate-200" : "text-slate-600"}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-bold transition ${
          plan.highlighted
            ? "bg-white text-ink hover:bg-slate-100"
            : "bg-slate-100 text-ink hover:bg-slate-200"
        }`}
        onClick={handleCheckout}
      >
        Assinar {plan.name}
      </button>
    </article>
  );
}
