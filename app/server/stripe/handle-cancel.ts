import "server-only";

import Stripe from "stripe";

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent
) {
  console.log(
    "Cancelou a assinatura. Enviar um email para o cliente informando que a assinatura foi cancelada"
  );
}
