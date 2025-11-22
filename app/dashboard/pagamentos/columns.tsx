"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Definição do Tipo de Dados para um Pagamento (Mock)
export type PagamentoMock = {
  id: string;
  emprestimoId: string;
  valorPago: number;
  dataPagamento: string;
  tipo: "JUROS" | "AMORTIZACAO" | "LIQUIDACAO_TOTAL";
  registadoPor: string;
};

// Função para formatar moeda (Metical)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 2,
  }).format(value);
};

export const columns: ColumnDef<PagamentoMock>[] = [
  // Coluna ID do Empréstimo
  {
    accessorKey: "emprestimoId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID Empréstimo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 font-medium">{row.getValue("emprestimoId")}</div>
    ),
  },

    // Coluna ID do Empréstimo
  {
    accessorKey: "clienteNome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome do Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 font-medium">{row.getValue("clienteNome")}</div>
    ),
  },


  // Coluna Valor Pago
  {
    accessorKey: "valorPago",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor Pago
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valorPago"));
      return (
        <div className="text-right font-medium text-green-600">
          {formatCurrency(amount)}
        </div>
      );
    },
  },

  // Coluna Tipo de Pagamento
  {
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string;

      return (
        <Badge
          variant={
            tipo === "LIQUIDACAO_TOTAL"
              ? "default"
              : tipo === "JUROS"
              ? "secondary"
              : "outline"
          }
          className={cn(
            "capitalize",
            tipo === "LIQUIDACAO_TOTAL" && "bg-green-700 hover:bg-green-800 text-white"
          )}
        >
          {tipo.toLowerCase().replace('_', ' ')}
        </Badge>
      );
    },
  },

  // Coluna Data de Pagamento
  {
    accessorKey: "dataPagamento",
    header: "Data",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dataPagamento"));
      return <div>{date.toLocaleDateString("pt-MZ")}</div>;
    },
  },

  // Coluna Registado Por
  {
    accessorKey: "registadoPor",
    header: "Registado Por",
    cell: ({ row }) => <div className="text-sm">{row.getValue("registadoPor")}</div>,
  },

  // Coluna Ações
  {
    id: "actions",
    cell: ({ row }) => {
      const pagamento = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(pagamento.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>Ver Empréstimo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];