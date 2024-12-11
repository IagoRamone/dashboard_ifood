import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black px-8 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-yellow-500">Dashboard</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-white hover:text-gray-800">Home</Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-white hover:text-gray-800">Entrar</Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-gray-800">Sobre</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
