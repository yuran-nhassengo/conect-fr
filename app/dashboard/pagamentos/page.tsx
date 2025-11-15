"use client";

import React, { useState } from "react";
import { columns, PagamentoMock } from "./columns";
import { DataTable } from "./data-table";
import { AddPagamentoInline } from "@/app/compontes/modals/add-pagamento-modal";
import { PlusCircle } from "lucide-react";

// ---------- Dados Mock ----------
const mockData: PagamentoMock[] = [
  { id: "PAG001", emprestimoId: "EMP-2024-001", valorPago: 15000.0, dataPagamento: "2025-10-01", tipo: "JUROS", registadoPor: "Ana Silva" },
  { id: "PAG002", emprestimoId: "EMP-2024-005", valorPago: 50000.0, dataPagamento: "2025-10-05", tipo: "AMORTIZACAO", registadoPor: "Pedro Costa" },
  { id: "PAG003", emprestimoId: "EMP-2024-002", valorPago: 8000.0, dataPagamento: "2025-10-10", tipo: "JUROS", registadoPor: "Ana Silva" },
  { id: "PAG004", emprestimoId: "EMP-2024-003", valorPago: 120000.0, dataPagamento: "2025-10-15", tipo: "LIQUIDACAO_TOTAL", registadoPor: "Marta Fernandes" },
  { id: "PAG005", emprestimoId: "EMP-2024-001", valorPago: 15000.0, dataPagamento: "2025-11-01", tipo: "JUROS", registadoPor: "Pedro Costa" },
  { id: "PAG006", emprestimoId: "EMP-2024-004", valorPago: 75000.0, dataPagamento: "2025-11-03", tipo: "AMORTIZACAO", registadoPor: "Marta Fernandes" },
  { id: "PAG007", emprestimoId: "EMP-2024-005", valorPago: 18000.0, dataPagamento: "2025-11-08", tipo: "JUROS", registadoPor: "Ana Silva" },
  { id: "PAG008", emprestimoId: "EMP-2024-003", valorPago: 50000.0, dataPagamento: "2025-11-12", tipo: "AMORTIZACAO", registadoPor: "Pedro Costa" },
];

// ---------- Formatação de moeda ----------
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN", minimumFractionDigits: 2 }).format(value);

export default function PagamentosPage() {
  const [formOpen, setFormOpen] = useState(false);

  // Estatísticas
  const totalPagoGeral = mockData.reduce((acc, p) => acc + p.valorPago, 0);
  const jurosPagosGeral = mockData.filter(p => p.tipo === "JUROS").reduce((acc, p) => acc + p.valorPago, 0);
  const totalRegistos = mockData.length;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-950">
       <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Registo de Pagamentos
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Visualize e gerencie todos os pagamentos de empréstimos registados no sistema.
          </p>
        </div>

        {/* Botão toggle para abrir/fechar formulário */}
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center bg-blue-600 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {formOpen ? "Fechar Formulário" : "Adicionar Novo Pagamento"}
        </button>
      </header>

      {/* Formulário Inline */}
      {formOpen && (
        <div className="mb-8">
          <AddPagamentoInline onOpenChangeCards={(open) => setFormOpen(!open)} />
        </div>
      )}

      {/* Cartões e tabela só aparecem quando o formulário está fechado */}
      {!formOpen && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Pago (Geral)</p>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">{formatCurrency(totalPagoGeral)}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Juros Recebidos (Geral)</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">{formatCurrency(jurosPagosGeral)}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Registos</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">{totalRegistos}</p>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={mockData}
            filterColumnId="emprestimoId"
            filterPlaceholder="Pesquisar por ID de Empréstimo..."
          />
        </>
      )}

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Dados de demonstração. Conecte ao backend para dados reais.
      </footer>
    </div>
  );
}
