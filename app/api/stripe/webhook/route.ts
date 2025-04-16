import stripe from "@/app/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const headersList = await headers();
  const signature = headersList.get("Stripe-Signature");

  if (!signature || !secret) {
    return NextResponse.json(
      { error: "Missing Stripe-Signature header" },
      { status: 400 }
    );
  }

  const event = stripe.webhooks.constructEvent(body, signature, secret);

  switch (event.type) {
    case "checkout.session.completed": // Pagamento aprovado se status = paid
      break;

    case "checkout.session.expired": // Expirou o tempo de pagamento
      break;
    case "checkout.session.async_payment_succeeded": // Boleto pago
      break;

    case "checkout.session.async_payment_failed": // Boleto falhou
      break;

    case "customer.subscription.created": // Assinatura criada
      // Subscription created
      break;
    case "customer.subscription.updated": // Assinatura atualizada
      // Subscription atualizada
      break;
    case "customer.subscription.deleted": // Assinatura deletada
      // Subscription deletada
      break;
  }
}
