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
        </li>
      </ul>
    </aside>
  );
}