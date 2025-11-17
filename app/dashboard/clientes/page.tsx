"use client";

import React, { useState } from "react";

import { columns,  } from "./columns";
import { DataTable } from "./data-table";
import { PlusCircle } from "lucide-react";
import { AddClientInline } from "@/app/compontes/modals/add-client-modal";
import { useClientes } from "@/app/hooks/useClientes";
import { useEstatisticas } from "@/app/hooks/useEstatisticas";



export default function ClientesPage() {
  const [formOpen, setFormOpen] = useState(false);


  // Dados reais do backend
  const { data: clientes, isLoading, error } = useClientes();

    const { data: estatisticas,  isLoading: statsLoading, error: statsError} = useEstatisticas();


const totalClientes = clientes?.length ?? 0;
const ativos = estatisticas?.ativos ?? 0;
const atrasado = estatisticas?.atrasado ?? 0;
const liquidado = estatisticas?.liquidado ?? 0;
const renovado = estatisticas?.renovado ?? 0;

  
  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Gestão de Clientes
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Visualize e gerencie todos os clientes registados no sistema.
          </p>
        </div>

        {/* Botão toggle único */}
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center bg-blue-600 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {formOpen ? "Fechar Formulário" : "Adicionar Novo Cliente"}
        </button>
      </header>

      {/* Formulário Inline */}
      {formOpen && (
        <div className="mb-8">
          <AddClientInline onSubmitSuccess={() => setFormOpen(false)} />
        </div>
      )}

      {/* Cards + Tabela só aparecem se o formulário estiver fechado */}
      {!formOpen && (
        <>
          {/* Cartões de Estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Clientes</p>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">{totalClientes}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clientes Pendentes</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">{estatisticas?.ativos || 0 }</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clientes Atrasados</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">{estatisticas?.atrasado}</p>
            </div>
             <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clientes Liquidados</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">{estatisticas?.liquidado}</p>
            </div>
             <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clientes Renovados</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">{estatisticas?.renovado}</p>
            </div>
          </div>

          {/* Tabela de Clientes */}
          <DataTable
            columns={columns}
            data={clientes}
            filterColumnId="nome"
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
