"use client";

import React, { useState, useMemo } from "react";

import { DataTable } from "./data-table"; // Componente genérico

import { PlusCircle, Loader2, AlertTriangle } from "lucide-react";


export default function EmpresasPage() {
  const [formOpen, setFormOpen] = useState(false);

  // Dados reais via React Query
  const { data: empresas = [] as EmpresaMock[], isLoading, isError } = useEmpresas();

  // Estatísticas (useMemo para performance)
  const estatisticas = useMemo(() => {
    const totalEmpresas = empresas.length;
    const totalAtivas = empresas.filter(e => e.status === "ATIVA").length;
    const totalBloqueadas = empresas.filter(e => e.status === "BLOQUEADA").length;
    const totalPendentes = empresas.filter(e => e.status === "PENDENTE").length;

    return { totalEmpresas, totalAtivas, totalBloqueadas, totalPendentes };
  }, [empresas]);

  const { totalEmpresas, totalAtivas, totalBloqueadas, totalPendentes } = estatisticas;

  // Callback para fechar formulário
  const handleFormClose = (open: boolean) => {
    if (!open) setFormOpen(false);
  };

  if (isError) {
    return (
      <div className="p-10 text-center bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg m-10">
        <AlertTriangle className="mr-2 h-6 w-6 inline" />
        <h2 className="font-bold text-xl">Erro ao carregar empresas.</h2>
        <p>Verifique a conexão com o servidor e a query de empresas.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Gestão de Empresas
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Visualize, gerencie e adicione empresas registradas no sistema.
          </p>
        </div>

        {/* Botão toggle para abrir/fechar formulário */}
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {formOpen ? "Fechar Formulário" : "Adicionar Nova Empresa"}
        </button>
      </header>

      {/* Formulário Inline */}
      {formOpen && (
        <div className="mb-8">
          <AddEmpresaInline onOpenChangeCards={handleFormClose} />
        </div>
      )}

      {/* Estado de Carregamento */}
      {isLoading && (
        <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-md mt-8">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-2" />
          <span className="text-lg text-gray-600">A carregar empresas...</span>
        </div>
      )}

      {/* Cartões e tabela */}
      {!formOpen && !isLoading && (
        <>
          {empresas.length > 0 ? (
            <>
              {/* Cartões de Estatísticas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total de Empresas</p>
                  <p className="text-3xl font-extrabold text-blue-600 mt-1">{totalEmpresas}</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Empresas Ativas</p>
                  <p className="text-3xl font-extrabold text-green-600 mt-1">{totalAtivas}</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Empresas Bloqueadas</p>
                  <p className="text-3xl font-extrabold text-red-600 mt-1">{totalBloqueadas}</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-shadow hover:shadow-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Empresas Pendentes</p>
                  <p className="text-3xl font-extrabold text-yellow-600 mt-1">{totalPendentes}</p>
                </div>
              </div>

              {/* Tabela de Empresas */}
              <DataTable
                columns={columns}
                data={empresas}
                filterColumnId="nome"
                filterPlaceholder="Pesquisar por nome da empresa..."
              />
            </>
          ) : (
            <div className="p-10 text-center bg-white rounded-xl shadow-md mt-8 border border-dashed border-gray-300 text-gray-600">
              <p className="font-semibold text-xl">Nenhuma empresa encontrada.</p>
              <p>Use o botão "Adicionar Nova Empresa" para começar.</p>
            </div>
          )}
        </>
      )}

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Status: {isLoading ? "Aguardando dados..." : "Dados carregados."}
      </footer>
    </div>
  );
}
