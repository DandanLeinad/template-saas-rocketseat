import stripe from "@/app/lib/stripe";
import { console } from "inspector";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    
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
      case "checkout.session.completed": // Pagamento aprovado se status = paid - Pode ser tanto pagamento único quanto assinatura
        const metadata = event.data.object.metadata;
  
        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleStripePayment(event);
        }
  
        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleStripeSubscription(event);
        }
  
        break;
      case "checkout.session.expired": // Expirou o tempo de pagamento
        console.log(
          "Enviar um email para o o cliente informando que o pagamento expirou"
        );
        break;
      case "checkout.session.async_payment_succeeded": // Boleto pago
        console.log(
          "Enviar um email para o o cliente informando que o pagamento foi confirmado"
        );
        break;
      case "checkout.session.async_payment_failed": // Boleto falhou
        console.log(
          "Enviar um email para o o cliente informando que o pagamento falhou"
        );
        break;
      case "customer.subscription.created": // Assinatura criada
        console.log("Mensagem de boas-vindas para o cliente porque ele assinou");
        break;
      // case "customer.subscription.updated": // Assinatura atualizada
      //   console.log("Assinatura atualizada para o cliente");
      //   break;
      case "customer.subscription.deleted": // Assinatura deletada
        await handleStripeCancelSubscription(event);
        break;
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
