import Sidebar from "../components/sidebar";
import Card from "../components/card";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <section className="text-center">
          <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>
        </section>
        <div className="flex flex-wrap justify-between gap-4">
          <Card
            icon="fa-box"
            text="R$ 70.093,41 Total"
            subtext="R$ 67.358,74 Produtos"
          />
          <Card
            icon="fa-shopping-cart"
            text="1.123 Pedidos"
            subtext="R$ 62,42 Ticket Médio"
          />
          <Card
            icon="fa-truck"
            text="R$ 3,42 Entrega Média"
            subtext=""
          />
          <Card
            icon="fa-star"
            text="41 Avaliações"
            subtext="4,8 Nota Média"
          />
        </div>
      </main>
    </div>
  );
}
