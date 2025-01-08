'use client';

import Sidebar from "../components/sidebar";
import { useState } from "react";

export default function Account() {
  const user = {
    name: "João da Silva",
    email: "joao.silva@email.com",
  };

  const [stores, setStores] = useState([
    { id: 1, name: "Galeteria Continental" },
    { id: 2, name: "Balada MIX" },
    { id: 3, name: "Nema Padaria" },
  ]);

  const handleAddStore = () => {
    console.log("Navegar para página de cadastro de nova loja");

};

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[320px] flex-1 p-6">
        <section className="mb-8">
          <h1 className="text-3xl font-bold">Conta</h1>
          <p className="mt-2 text-lg">{user.name}!</p>
          <p className="text-gray-600">{user.email}</p>
        </section>

        <button
          onClick={handleAddStore}
          className="mb-6 rounded-md bg-red-600 px-6 py-3 text-white hover:bg-red-700"
        >
          Cadastrar nova loja
        </button>

        <section >
          <h2 className="mb-4 text-xl font-bold">Lojas cadastradas</h2>
          <ul className="space-y-4">
            {stores.map((store) => (
              <li
                key={store.id}
                className="rounded border p-4 shadow-sm hover:shadow-md"
              >
                {store.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
