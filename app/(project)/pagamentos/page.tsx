export default function Pagamentos() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Pagamentos</h1>
      <button className="border rounded-md px-1">Criar Pagamento Stripe</button>
      <button className="border rounded-md px-1">
        Criar Assinatura Stripe
      </button>
      <button className="border rounded-md px-1">
        Criar Portal de pagamentos
      </button>
    </div>
  );
}
