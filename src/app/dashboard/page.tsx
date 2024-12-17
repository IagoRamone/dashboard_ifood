'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import Sidebar from "../components/sidebar";
import Card from "../components/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-[260px] flex-1 p-6"> 
        <Page />
        <Dashboard />
      </div>
    </div>
  );
}

function Page() {
  return (
    <main className="mx-auto max-w-[1500px] p-6">
      <section className="text-center">
        <h1 className="mb-6 text-4xl font-bold">Dashboard</h1>
      </section>
      <div className="flex flex-wrap justify-between gap-2">
        <Card
          icon={<i className="fas fa-box"></i>}
          text="R$ 70.093,41 Total"
          subtext="R$ 67.358,74 Produtos"
        />
        <Card
          icon={<i className="fas fa-shopping-cart"></i>}
          text="1.123 Pedidos"
          subtext="R$ 62,42 Ticket Médio"
        />
        <Card
          icon={<i className="fas fa-truck"></i>}
          text="R$ 3,42 Entrega Média"
          subtext=""
        />
        <Card
          icon={<i className="fas fa-star"></i>}
          text="41 Avaliações"
          subtext="4,8 Nota Média"
        />
      </div>
    </main>
  );
}

function Dashboard() {
  const barData = {
    labels: ['28/08', '29/08', '30/08', '02/09', '03/09', '04/09'],
    datasets: [
      {
        label: 'Faturamento',
        data: [4000, 5000, 3000, 4500, 5500, 7000],
        backgroundColor: '#4fd1c5',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <div className="mb-10">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
