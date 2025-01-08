'use client';

import { useState } from 'react';
import axios from 'axios';

export default function IfoodIntegrationPage() {
  const [token, setToken] = useState<string | null>(null);
  const [reconciliationData, setReconciliationData] = useState<any[]>([]);
  const [settlementsData, setSettlementsData] = useState<any[]>([]);
  const [competence, setCompetence] = useState<string>('');

  const fetchToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/financeiro/token');
      setToken(response.data.access_token);
      alert('Token obtido com sucesso!');
    } catch (error) {
      console.error('Erro ao buscar o token:', error);
      alert('Erro ao buscar o token');
    }
  };

  const fetchReconciliation = async () => {
    try {
      const response = await axios.get(
        `/financeiro/reconciliation/e97c1af6-1ade-4248-b287-d9d13848039d?competence=${competence}`
      );
      setReconciliationData(response.data);
      alert('Reconciliação obtida com sucesso!');
    } catch (error) {
      console.error('Erro ao buscar reconciliação:', error);
      alert('Erro ao buscar reconciliação');
    }
  };

  const fetchSettlements = async () => {
    try {
      const response = await axios.get(
        `/financeiro/settlements/e97c1af6-1ade-4248-b287-d9d13848039d`
      );
      setSettlementsData(response.data);
      alert('Settlements obtidos com sucesso!');
    } catch (error) {
      console.error('Erro ao buscar settlements:', error);
      alert('Erro ao buscar settlements');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integração com iFood</h1>
      
      <div className="mb-4">
        <label htmlFor="competence" className="block font-medium">Competência:</label>
        <input
          type="month"
          id="competence"
          value={competence}
          onChange={(e) => setCompetence(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchToken}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Buscar Token
        </button>
        <button
          onClick={fetchReconciliation}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Buscar Reconciliação
        </button>
        <button
          onClick={fetchSettlements}
          className="bg-purple-500 text-white px-6 py-2 rounded"
        >
          Buscar Settlements
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Token:</h2>
        <p className="p-4 border rounded bg-gray-100">
          {token ? token : 'Nenhum token disponível.'}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Reconciliação:</h2>
        <pre className="p-4 border rounded bg-gray-100 overflow-x-auto">
          {reconciliationData.length > 0
            ? JSON.stringify(reconciliationData, null, 2)
            : 'Nenhuma reconciliação disponível.'}
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Settlements:</h2>
        <pre className="p-4 border rounded bg-gray-100 overflow-x-auto">
          {settlementsData.length > 0
            ? JSON.stringify(settlementsData, null, 2)
            : 'Nenhum settlement disponível.'}
        </pre>
      </div>
    </div>
  );
}
