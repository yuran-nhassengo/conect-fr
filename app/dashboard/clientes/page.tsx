"use client";

import React, { useState } from "react";

import { columns, ClienteMock } from "./columns";
import { DataTable } from "./data-table";
import { PlusCircle } from "lucide-react";
import { AddClientInline } from "@/app/compontes/modals/add-client-modal";

// Mock de clientes
const mockData: ClienteMock[] = [
  { id: "clt_12345", nome: "Ana Silva", nif: "100010001", email: "ana.silva@exemplo.com", telefone: "841234567", status: "ATIVO" },
  { id: "clt_67890", nome: "João Mário", nif: "100020002", email: "joao.mario@exemplo.com", telefone: "829876543", status: "ATIVO" },
  { id: "clt_11223", nome: "Maria Joana", nif: "100030003", email: "maria.joana@exemplo.com", telefone: "875554443", status: "PENDENTE" },
  { id: "clt_44556", nome: "Pedro Alves", nif: "100040004", email: "pedro.alves@exemplo.com", telefone: "861122334", status: "INATIVO" },
  { id: "clt_77889", nome: "Carla Pinho", nif: "100050005", email: "carla.pinho@exemplo.com", telefone: "847778889", status: "ATIVO" },
  { id: "clt_99001", nome: "Fernando Costa", nif: "100060006", email: "fernando.costa@exemplo.com", telefone: "820001112", status: "ATIVO" },
  { id: "clt_22334", nome: "Sofia Teixeira", nif: "100070007", email: "sofia.teixeira@exemplo.com", telefone: "873332211", status: "PENDENTE" },
];

export default function ClientesPage() {
  const [formOpen, setFormOpen] = useState(false);

  // Estatísticas
  const totalClientes = mockData.length;
  const ativos = mockData.filter(c => c.status === "ATIVO").length;
  const pendentes = mockData.filter(c => c.status === "PENDENTE").length;

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
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clientes Ativos</p>
              <p className="text-3xl font-extrabold text-green-600 mt-1">{ativos}</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clientes Pendentes</p>
              <p className="text-3xl font-extrabold text-yellow-600 mt-1">{pendentes}</p>
            </div>
          </div>

          {/* Tabela de Clientes */}
          <DataTable
            columns={columns}
            data={mockData}
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
