'use client';

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { DataTable } from './data-table';
import { AddEmprestimoInline } from '@/app/compontes/modals/add-emprestimo-modal';
import { columns } from './columns';
import { useQueryClient } from '@tanstack/react-query';
import { useEmprestimos } from '@/app/hooks/useEmprestimos';

export default function EmprestimosPage() {
  const [formOpen, setFormOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: emprestimos = [], isLoading, isError } = useEmprestimos();

  // Mapeia os dados para incluir clienteNome
  const emprestimosFormatados = emprestimos.map(e => ({
    ...e,
    clienteNome: e.cliente?.nome || '—', // cria clienteNome para a tabela
  }));

  // Estatísticas
  const totalEmprestimos = emprestimosFormatados.length;
  const totalAtivos = emprestimosFormatados.filter(e => e.status === 'ATIVO').length;
  const totalLiquidado = emprestimosFormatados.filter(e => e.status === 'LIQUIDADO').length;
  const totalAtrasado = emprestimosFormatados.filter(e => e.status === 'ATRASADO').length;
  const totalValor = emprestimosFormatados.reduce((acc, e) => acc + e.valorPrincipal, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN', minimumFractionDigits: 2 }).format(value);

  if (isLoading) return <p className="p-6">Carregando empréstimos...</p>;
  if (isError) return <p className="p-6 text-red-600">Erro ao carregar empréstimos.</p>;

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
          {formOpen ? 'Fechar Formulário' : 'Adicionar Novo Empréstimo'}
        </button>
      </header>

      {/* Formulário Inline */}
      {formOpen && (
        <div className="mb-8">
          <AddEmprestimoInline
            onOpenChangeCards={() => {
              setFormOpen(false);
              queryClient.invalidateQueries(['emprestimos']); // Atualiza tabela após adicionar
            }}
          />
        </div>
      )}

      {/* Cards e Tabela */}
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
            data={emprestimosFormatados}
            filterColumnId="clienteNome"
            filterPlaceholder="Pesquisar por nome do cliente..."
          />
        </>
      )}

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Dados carregados do backend.
      </footer>
    </div>
  );
}
