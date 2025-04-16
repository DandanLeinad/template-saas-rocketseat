import "server-only";

import Stripe from "stripe";

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Assinatura aprovada. Enviar um email e liberar o acesso ao cliente"
    );
  }
}
