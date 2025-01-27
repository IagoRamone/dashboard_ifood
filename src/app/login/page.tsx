'use client';

import { useState } from "react";
import Image from "next/image";

export default function Login() {
  return (
    <>
      <Header />
      <LoginPage />
    </>
  );
}

function Header() {
  return (
    <header className="bg-black p-4 text-center">
      <a href="/dashboard">
        <Image
          className="ml-12"
          src="/logo_adez.png"
          alt="ADEZ Logo"
          width={150}
          height={50}
        />
      </a>
    </header>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Login bem-sucedido!");
      // Redirecionar ou atualizar a página
    } else {
      setMessage(data.error || "Erro ao fazer login.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px] h-[450px]">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              maxLength={8}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              maxLength={6}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {message && <p className="text-center text-red-500">{message}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 border border-black rounded-full bg-white font-semibold hover:bg-black hover:text-white transition duration-200"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
