"use client";

import React, { useState, useMemo } from "react";
// ❌ CORREÇÃO: Assumindo que columns e data-table estão no mesmo diretório ou em caminhos relativos acessíveis.
import { columns } from "./columns"; 
import { DataTable } from "./data-table";

import { AddPagamentoInline } from "@/app/compontes/modals/add-pagamento-modal"; // Manter o alias, mas se falhar, o problema é na configuração de alias.
import { PlusCircle, Loader2, AlertTriangle } from "lucide-react";
import { usePagamentos } from "@/app/hooks/usePagamentos"; // Manter o alias, mas se falhar, o problema é na configuração de alias.
// useQueryClient foi importado, mas não é estritamente necessário neste componente.
// import { useQueryClient } from "@tanstack/react-query"; 

// ---------- Tipagem (necessária para os cálculos e tipagem do array) ----------
interface Pagamento {
    valorPago: number;
    tipo: 'JUROS' | 'PRINCIPAL' | string; 
    // Adicione outras propriedades necessárias para a tabela aqui, como emprestimoId, dataPagamento, etc.
}

// ---------- Formatação de moeda ----------
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN", minimumFractionDigits: 2 }).format(value);

export default function PagamentosPage() {
  const [formOpen, setFormOpen] = useState(false);
  
  // ✅ Usando os dados reais e tratando estados do React Query
  const { data: pagamentos = [] as Pagamento[], isLoading, isError } = usePagamentos();

  const pagamentosFormatados = pagamentos.map(e =>({
    ...e,
    clienteNome: e.emprestimo?.cliente?.nome || '-',
  }))
  // 🔹 Estatísticas (Calculadas usando useMemo para performance e usando 'pagamentos' real)
  const estatisticas = useMemo(() => {
    // Usando 'pagamentos' (dados reais) para o cálculo
    const totalPagoGeral = pagamentos.reduce((acc, p) => acc + p.valorPago, 0);
    
    // Filtramos e reduzimos apenas o que é identificado como "JUROS"
    const jurosPagosGeral = pagamentos
      .filter(p => p.tipo === "JUROS")
      .reduce((acc, p) => acc + p.valorPago, 0);
    
    const totalRegistos = pagamentos.length;

    return { totalPagoGeral, jurosPagosGeral, totalRegistos };
  }, [pagamentos]); // Recalcula apenas quando o array 'pagamentos' muda

  const { totalPagoGeral, jurosPagosGeral, totalRegistos } = estatisticas;

  // Função de callback para fechar o formulário após submissão bem-sucedida no AddPagamentoInline
  const handleFormClose = (open: boolean) => {
    // Se o componente filho indicar que foi fechado (!open), atualizamos o estado local.
    if (!open) {
      setFormOpen(false);
    }
  };


  if (isError) {
    return (
      <div className="p-10 text-center bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg m-10">
        <AlertTriangle className="mr-2 h-6 w-6 inline" />
        <h2 className="font-bold text-xl">Erro ao carregar pagamentos.</h2>
        <p>Verifique a conexão com o servidor e a query de pagamentos.</p>
      </div>
    );
  }

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
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          {formOpen ? "Fechar Formulário" : "Adicionar Novo Pagamento"}
        </button>
      </header>

      {/* Formulário Inline */}
      {formOpen && (
        <div className="mb-8">
          {/* ✅ Passando o handler corrigido */}
          <AddPagamentoInline onOpenChangeCards={handleFormClose} />
        </div>
      )}
      
      {/* Estado de Carregamento */}
      {isLoading && (
        <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-md mt-8">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-2" />
          <span className="text-lg text-gray-600">A carregar registos de pagamentos...</span>
        </div>
      )}

      {/* Cartões e tabela só aparecem quando o formulário está fechado E dados carregados */}
      {!formOpen && !isLoading && (
        <>
          {pagamentos.length > 0 ? (
            <>
              {/* Cartões de Estatísticas */}
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

              {/* Tabela de Dados */}
              <DataTable
                columns={columns}
                data={pagamentosFormatados} // ✅ Usando pagamentos reais
                filterColumnId="emprestimoId"
                filterPlaceholder="Pesquisar por ID de Empréstimo..."
              />
            </>
          ) : (
            <div className="p-10 text-center bg-white rounded-xl shadow-md mt-8 border border-dashed border-gray-300 text-gray-600">
                <p className="font-semibold text-xl">Nenhum pagamento encontrado.</p>
                <p>Use o botão "Adicionar Novo Pagamento" para começar.</p>
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