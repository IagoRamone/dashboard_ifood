export default function Sidebar() {
    return (
      <aside className="fixed h-screen w-64 bg-black p-4 text-white">
        <h2 className="mb-6 text-xl font-semibold">Dashboard Adez</h2>
        <ul>
          <li className="rounded p-2 hover:bg-gray-800">
            <i className="bi bi-house mr-2"></i> Home
          </li>
          <li className="rounded p-2 hover:bg-gray-800">
            <i className="bi bi-bag mr-2"></i> Vendas
          </li>
          <li className="rounded p-2 hover:bg-gray-800">
            <i className="bi bi-credit-card mr-2"></i> Pagamentos
          </li>
          <li className="rounded p-2 hover:bg-gray-800">
            <i className="bi bi-person mr-2"></i> Clientes
          </li>
          <li className="rounded p-2 hover:bg-gray-800">
            <i className="bi bi-star mr-2"></i> Avaliações
          </li>
          <li className="rounded p-2 hover:bg-gray-800">
            <i className="bi bi-person mr-2"></i> Conta
          </li>
        </ul>
      </aside>
    );
  }
  