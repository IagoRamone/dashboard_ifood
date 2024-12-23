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
      setGraphUrl(null); // Limpar gráfico anterior
      setError(null);    // Limpar erro anterior
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

      // Verificar o tipo de conteúdo da resposta
      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('image/png')) {
        throw new Error("Resposta não contém uma imagem válida.");
      }

      // Converte a resposta em um blob
      const data = await response.blob();

      // Cria uma URL para a imagem e atualiza o estado
      const url = URL.createObjectURL(data);
      setGraphUrl(url);
      console.log("Gráfico recebido com sucesso!");
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
