<<<<<<< HEAD
"use client";
import { useState } from "react";
=======
import Link from 'next/link';
>>>>>>> developer

export default function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  

  return (
    <aside className="w-65 fixed h-screen bg-black p-5 text-white">
      <h2 className="mb-6 text-4xl font-semibold">Dashboard Adez</h2>
      <ul className="text-xl">
<<<<<<< HEAD
        <li className="rounded p-2 hover:bg-gray-800">
          <i className="bi bi-house mr-2"></i> Home
        </li>
        <li className="rounded p-2 hover:bg-gray-800">
          <button
            onClick={() => toggleDropdown(1)}
            className="w-full text-left flex items-center"
          >
            <i className="bi bi-bag mr-2"></i> Vendas
            <i className={`ml-auto bi ${openDropdown === 1 ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
          </button>
          {openDropdown === 1 && (
            <ul className="ml-4 mt-2 bg-gray-900 rounded">
              <li className="p-2 hover:bg-gray-800">Resumo</li>
              <li className="p-2 hover:bg-gray-800">Detalhes</li>
            </ul>
          )}
        </li>
        <li className="rounded p-2 hover:bg-gray-800">
          <button
            onClick={() => toggleDropdown(2)}
            className="w-full text-left flex items-center"
          >
            <i className="bi bi-credit-card mr-2"></i> Pagamentos
            <i className={`ml-auto bi ${openDropdown === 2 ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
          </button>
          {openDropdown === 2 && (
            <ul className="ml-4 mt-2 bg-gray-900 rounded">
              <li className="p-2 hover:bg-gray-800">Pendentes</li>
              <li className="p-2 hover:bg-gray-800">Histórico</li>
            </ul>
          )}
        </li>
        <li className="rounded p-2 hover:bg-gray-800">
          <i className="bi bi-person mr-2"></i> Clientes
        </li>
        <li className="rounded p-2 hover:bg-gray-800">
          <i className="bi bi-star mr-2"></i> Avaliações
        </li>
        <li className="rounded p-2 hover:bg-gray-800">
          <i className="bi bi-person mr-2"></i> Conta
=======
        <li className="rounded p-2 text-xl hover:bg-gray-800">
          <Link href="/">
              <i className="bi bi-house mr-2 py-10"></i> Home        
          </Link>
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <Link href="/vendas">
              <i className="bi bi-bag mr-2"></i> Vendas
          </Link>
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <Link href="/pagamentos">
        
              <i className="bi bi-credit-card mr-2"></i> Pagamentos

          </Link>
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <Link href="/clientes">
         
              <i className="bi bi-person mr-2"></i> Clientes
       
          </Link>
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <Link href="/avaliacoes">
          
              <i className="bi bi-star mr-2"></i> Avaliações
      
          </Link>
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <Link href="/analise">
              <i className="bi bi-person mr-2"></i> Análise de Dados
          </Link>
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <Link href="/gemini">
              <i className="bi bi-person mr-2"></i> AI
          </Link>
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <Link href="/conta">
              <i className="bi bi-person mr-2"></i> Conta
          </Link>
>>>>>>> developer
        </li>
      </ul>
    </aside>
  );
}