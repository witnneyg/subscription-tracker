import { Router } from "express";
import { Request, Response } from "express";
import { stripe } from "../lib/stripe";

interface ExpandedProduct {
  name: string;
  description: string | null;
}

interface ExpandedProduct {
  name: string;
  description: string | null;
  active: boolean; // Adicionado para checar se o produto foi arquivado
}

const stripeRouter = Router();

stripeRouter.post(
  "/create-checkout-session",
  async (req: Request, res: Response) => {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: req.body.planId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      });
      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({
        error: "An error occurred while creating the checkout session.",
      });
    }
  },
);
stripeRouter.get(
  "/plans",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const prices = await stripe.prices.list({
        active: true,
        expand: ["data.product"],
      });

      const plans = prices.data
        .filter((price) => {
          const product = price.product as unknown as ExpandedProduct;
          return product && product.active === true;
        })
        .map((price) => {
          const product = price.product as unknown as ExpandedProduct;

          return {
            stripePriceId: price.id,
            name: product.name,
            description: product.description || "",
            price: price.unit_amount ? price.unit_amount / 100 : 0,
            frequency: price.recurring?.interval || "monthly",
          };
        });

      res.json(plans);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  },
);
export default stripeRouter;
