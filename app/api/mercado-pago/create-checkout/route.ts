import mpClient from "@/app/lib/mercado-pago";
import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testeId, userEmail } = await req.json();

  try {
    const preference = new Preference(mpClient);

    const createPreference = await preference.create({
      body: {
        external_reference: testeId, // ID do pedido - Isso impacta na pontuação do Mercado Pago
        metadata: {
          testeId, // Essa variável é contida para snake_case -> teste_id
        },
        ...(userEmail && { payer: { email: userEmail } }), // Também impacta na pontuação do Mercado Pago
        items: [
          {
            id: "",
            description: "",
            title: "",
            quantity: 1,
            unit_price: 1, // Valor em reais
            currency_id: "BRL",
            category_id: "services",
          },
        ],
        payment_methods: {
          installments: 12, // Número máximo de parcelas
          // excluded_payment_methods: [
          //   {
          //     id: "bolBradesco",
          //   },
          //   {
          //     id: "pec",
          //   },
          // ],
          // excluded_payment_types: [
          //   {
          //     id: "debit_card",
          //   },
          //   {
          //     id: "credit_card",
          //   },
          // ],
        },
        auto_return: "approved",
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercado-pago/pending`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercado-pago/pending`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercado-pago/pending`,
        },
      },
    });

    if (!createPreference.id) {
      return NextResponse.json(
        { error: "Erro ao criar checkout com Mercado Pago" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      preferenceId: createPreference.id,
      initPoint: createPreference.init_point,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar checkout com Mercado Pago" },
      { status: 500 }
    );
  }
}
