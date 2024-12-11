export default function Sidebar() {
  return (
    <aside className="w-65 fixed h-screen bg-black p-5 text-white">
      <h2 className="mb-6 text-4xl font-semibold">Dashboard Adez</h2>
      <ul className="text-xl">
        <li className="rounded p-2 text-xl hover:bg-gray-800">
          <i className="bi bi-house mr-2 py-10"></i> Home
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <i className="bi bi-bag mr-2"></i> Vendas
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <i className="bi bi-credit-card mr-2"></i> Pagamentos
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <i className="bi bi-person mr-2"></i> Clientes
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <i className="bi bi-star mr-2"></i> Avaliações
        </li>
        <li className="rounded p-2 py-3 text-xl hover:bg-gray-800">
          <i className="bi bi-person mr-2"></i> Conta
        </li>
      </ul>
    </aside>
  );
}
