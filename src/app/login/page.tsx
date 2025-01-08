'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
  };

  const handleRecoverPassword = () => {
    console.log("Recuperar senha para:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">Login</h1>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {/* Campo de Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
              className="w-full px-4 py-2 border rounded bg-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Senha */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-bold mb-2 text-black">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 border rounded bg-gray-100 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Link href="/dashboard">
            <button
            type="submit"
            className="w-full bg-[#fdd028] text-black py-2 px-4 rounded font-bold hover:bg-yellow-500 transition duration-200"
            >
            Entrar
            </button>
          </Link>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleRecoverPassword}
            className="text-sm text-blue-500 hover:underline"
          >
            Esqueceu sua senha?
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Não tem uma conta?{' '}
            <a href="/signup" className="text-blue-500 font-bold hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
