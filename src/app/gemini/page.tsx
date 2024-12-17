"use client";
import { useState } from "react";
import Sidebar from "../components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-[260px] flex-1 p-6"> 
        <GeminiPrompt />
      </div>
    </div>
  );
}

 function GeminiPrompt() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt) {
      alert("Por favor, insira um prompt!");
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar resposta do Gemini.");
      }

      const data = await res.json();
      setResponse(data.response || "Nenhuma resposta obtida.");
    } catch (error) {
      console.error("Erro:", error);
      setResponse("Erro ao obter resposta do Gemini.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded border p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Converse com uma IA</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Digite seu prompt aqui..."
          rows={4}
          className="rounded border p-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {response && (
        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Resposta:</h2>
          <p className="rounded border bg-gray-100 p-4">{response}</p>
        </div>
      )}
    </div>
  );
}
