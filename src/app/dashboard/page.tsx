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
  selectedStore: string;
  setSelectedStore: (value: string) => void;
  selectedUnit: string;
  setSelectedUnit: (value: string) => void;
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
  const [selectedStore, setSelectedStore] = useState<string>('Todas');
  const [selectedUnit, setSelectedUnit] = useState<string>('Todas');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/financeiro/reconciliation/YOUR_MERCHANT_ID?competence=${competence}`
      );
      const reconciliationData: ReconciliationItem[] = response.data;

      const newLabels = reconciliationData.map((item) => item.date);
      const newData = reconciliationData.map((item) => item.total);

      setLabels(newLabels);
      setData(newData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  // Dados provisórios 
  const provisionalLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const provisionalData = [5000, 8000, 6000, 7000, 9000, 8500, 7500, 9500, 6500, 8000, 8700, 9200];

  const barData = {
    labels: labels.length > 0 ? labels : provisionalLabels,
    datasets: [
      {
        label: 'Faturamento',
        data: data.length > 0 ? data : provisionalData,
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
          selectedStore={selectedStore} 
          setSelectedStore={setSelectedStore}
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
          fetchData={fetchData} 
        />
        <Dashboard barData={barData} barOptions={barOptions} />
      </div>
    </div>
  );
}

function Page({
  competence,
  setCompetence,
  selectedStore,
  setSelectedStore,
  selectedUnit,
  setSelectedUnit,
  fetchData,
}: PageProps) {
  const stores = ["Todas", "Loja A", "Loja B", "Loja C"];
  const units = ["Todas", "Unidade 1", "Unidade 2", "Unidade 3"];

  return (
    <main className="mx-auto max-w-[1500px] ml-20 p-6">
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

      {/* Filtros */}
      <div className="my-4 flex items-center justify-center gap-4">
        <div>
          <label htmlFor="competence" className="block font-bold">Data:</label>
          <input
            type="month"
            id="competence"
            value={competence}
            onChange={(e) => setCompetence(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="store" className="block font-bold">Loja:</label>
          <select
            id="store"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="border rounded px-4 py-2"
          >
            {stores.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="unit" className="block font-bold">Unidade:</label>
          <select
            id="unit"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="border rounded px-4 py-2"
          >
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Filtrar
        </button>
      </div>
    </main>
  );
}

function Dashboard({ barData, barOptions }: DashboardProps) {
  return (
    <div className="mx-auto ml-4 max-w-[1500px] p-6">
      <div className="mb-10">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}
