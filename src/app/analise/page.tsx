"use client";
import { useState } from 'react';
import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[260px] flex-1 p-6"> 
        <Analise />
      </div>
    </div>
  );
}

function Analise() {
  const [file, setFile] = useState<File | null>(null);
  const [graphUrl, setGraphUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setGraphUrl(null); 
      setError(null);    
      console.log("Arquivo selecionado:", e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!file) {
      alert("Selecione um arquivo Excel!");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      console.log("Enviando arquivo para o servidor...");
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.statusText}`);
      }
  
      // Processar resposta JSON
      const data = await response.json();
      if (data.graphs && Array.isArray(data.graphs)) {
        const imageUrls = data.graphs.map((graph: string) => {
          return `data:image/png;base64,${btoa(graph)}`;
        });
        setGraphUrl(imageUrls[0]); // Mostra o primeiro gráfico (ajuste conforme necessário)
        console.log("Gráfico recebido com sucesso!");
      } else {
        throw new Error("Resposta do servidor não contém gráficos válidos.");
      }
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      setError("Erro ao processar o arquivo. Tente novamente.");
    }
  };
  

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-center text-2xl font-semibold">Análise de Dados</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="mb-4"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Enviar Arquivo
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {graphUrl && (
        <div className="mt-6">
          <h2 className="mb-4 text-xl">Gráfico Gerado</h2>
          <img src={graphUrl} alt="Gráfico gerado" className="max-w-full" />
        </div>
      )}
    </div>
  );
}
