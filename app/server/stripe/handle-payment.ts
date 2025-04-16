import "server-only";

import Stripe from "stripe";

export async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento aprovado. Enviar um email e liberar o acesso ao cliente"
    );
  } else {
    console.log("Pagamento não aprovado");
  }
}
