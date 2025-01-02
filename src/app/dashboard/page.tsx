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
import { useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import Card from "../components/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ReconciliationItem {
  date: string;
  total: number;
}

interface PageProps {
  competence: string;
  setCompetence: (value: string) => void;
  fetchData: () => void;
}

interface DashboardProps {
  barData: any;
  barOptions: any;
}

export default function Home() {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [competence, setCompetence] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/financeiro/reconciliation/YOUR_MERCHANT_ID?competence=${competence}`
      );
      const reconciliationData: ReconciliationItem[] = response.data;

      // Processando os dados para o gráfico
      const newLabels = reconciliationData.map((item) => item.date);
      const newData = reconciliationData.map((item) => item.total);

      setLabels(newLabels);
      setData(newData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Faturamento',
        data: data,
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
    <div className="flex">
      <Sidebar />

      <div className="ml-[260px] flex-1 p-6"> 
        <Page 
          competence={competence} 
          setCompetence={setCompetence} 
          fetchData={fetchData} 
        />
        <Dashboard barData={barData} barOptions={barOptions} />
      </div>
    </div>
  );
}

function Page({ competence, setCompetence, fetchData }: PageProps) {
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

      {/* Filtro de Data */}
      <div className="my-4 flex items-center justify-center">
        <label htmlFor="competence" className="mr-4 font-bold">Filtrar por Data:</label>
        <input
          type="month"
          id="competence"
          value={competence}
          onChange={(e) => setCompetence(e.target.value)}
          className="border rounded px-4 py-2"
        />
        <button
          onClick={fetchData}
          className="ml-4 bg-blue-500 text-white px-6 py-2 rounded"
        >
          Filtrar
        </button>
      </div>
    </main>
  );
}

function Dashboard({ barData, barOptions }: DashboardProps) {
  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <div className="mb-10">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
