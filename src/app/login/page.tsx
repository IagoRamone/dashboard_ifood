'use client';

import Image from "next/image";

export default function Login(){
  return(
    <>
    <Header/>
    <LoginPage/>
    </>
  )
}

function Header(){
  return(
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
  )
}
function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px] h-[450px]">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form action="#" method="post" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              maxLength={8}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              maxLength={6}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Esqueci minha senha
            </a>
          </div>

          <button
          type="submit"
          className="w-full py-2 px-4 border border-black rounded-full bg-white font-semibold hover:bg-black hover:text-white transition duration-200"
          >
          Entrar
          </button>
          <a
            href="/assets/pag/cadastro.html"
            className="block text-center mt-4 py-2 px-4 border border-black rounded-full bg-white font-semibold text-black hover:bg-black hover:text-white transition duration-200"
          >
            Cadastrar
          </a>
        </form>
      </div>
    </div>
  );
}
