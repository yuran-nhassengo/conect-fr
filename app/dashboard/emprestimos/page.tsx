"use client";

import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

import { columns, type EmprestimoMock } from "./columns";
import { DataTable } from "./data-table";
import { AddEmprestimoInline } from "@/app/compontes/modals/add-emprestimo-modal";

// ---------- Mock de Empréstimos ----------
const mockData: EmprestimoMock[] = [
  { id: "EMP-001", clienteNome: "João Silva", valorPrincipal: 50000, jurosPercent: 30, status: "ATIVO", dataVencimento: "2025-12-10" },
  { id: "EMP-002", clienteNome: "Maria Sousa", valorPrincipal: 25000, jurosPercent: 25, status: "LIQUIDADO", dataVencimento: "2025-11-01" },
  { id: "EMP-003", clienteNome: "Carlos Mendes", valorPrincipal: 100000, jurosPercent: 30, status: "ATRASADO", dataVencimento: "2025-10-15" },
  { id: "EMP-004", clienteNome: "Ana Pereira", valorPrincipal: 15000, jurosPercent: 35, status: "RENOVADO", dataVencimento: "2025-12-20" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN", minimumFractionDigits: 2 }).format(value);

export default function EmprestimosPage() {
  const [formOpen, setFormOpen] = useState(false);

  // Estatísticas
  const totalEmprestimos = mockData.length;
  const totalAtivos = mockData.filter(e => e.status === "ATIVO").length;
  const totalLiquidado = mockData.filter(e => e.status === "LIQUIDADO").length;
  const totalAtrasado = mockData.filter(e => e.status === "ATRASADO").length;
  const totalValor = mockData.reduce((acc, e) => acc + e.valorPrincipal, 0);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Gestão de Empréstimos</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Visualize e gerencie todos os empréstimos registados no sistema.
          </p>
        </div>

        {/* Botão Toggle */}
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center bg-blue-600 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {formOpen ? "Fechar Formulário" : "Adicionar Novo Empréstimo"}
        </button>
      </header>

      {/* Formulário Inline */}
      {formOpen && (
        <div className="mb-8">
          <AddEmprestimoInline onOpenChangeCards={(open) => setFormOpen(!open)} />
        </div>
      )}

      {/* Cards e Tabela só aparecem se o formulário estiver fechado */}
      {!formOpen && (
        <>
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Empréstimos</p>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">{totalEmprestimos}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ativos</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">{totalAtivos}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Liquidado</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">{totalLiquidado}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Atrasado</p>
              <p className="text-3xl font-extrabold text-red-600 mt-1">{totalAtrasado}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Valor Total</p>
              <p className="text-3xl font-extrabold text-purple-600 mt-1">{formatCurrency(totalValor)}</p>
            </div>
          </div>

          {/* Tabela de Empréstimos */}
          <DataTable
            columns={columns}
            data={mockData}
            filterColumnId="clienteNome"
            filterPlaceholder="Pesquisar por nome do cliente..."
          />
        </>
      )}

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Dados de demonstração. Conecte ao backend para dados reais.
      </footer>
    </div>
  );
}
