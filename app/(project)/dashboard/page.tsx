import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Estamos no lado do servidor, então não podemos usar o useSession aqui
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Protect Dashboard Page</h1>
      <p>
        {session?.user?.email ? session.user.email : "Usuário não autenticado"}
      </p>
    </div>
  );
}
