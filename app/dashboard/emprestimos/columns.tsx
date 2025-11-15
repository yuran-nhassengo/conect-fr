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

// Este é o "tipo" dos seus dados.
// O page.tsx importa este tipo, por isso o exportamos daqui.
export type EmprestimoMock = {
  id: string;
  clienteNome: string;
  valorPrincipal: number;
  jurosPercent: number;
  status: "ATIVO" | "LIQUIDADO" | "ATRASADO" | "RENOVADO";
  dataVencimento: string;
};

// Função para formatar moeda (Metical)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 2,
  }).format(value);
};

export const columns: ColumnDef<EmprestimoMock>[] = [
  // Coluna Cliente
  {
    accessorKey: "clienteNome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 font-medium">{row.getValue("clienteNome")}</div>
    ),
  },

  // Coluna Valor Principal
  {
    accessorKey: "valorPrincipal",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor Principal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valorPrincipal"));
      return (
        <div className="text-right font-medium">
          {formatCurrency(amount)}
        </div>
      );
    },
  },

  // Coluna Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <Badge
          variant={
            status === "ATRASADO"
              ? "destructive"
              : status === "LIQUIDADO"
              ? "outline"
              : "default"
          }
          className={cn(
            "capitalize",
            status === "RENOVADO" && "bg-blue-500 text-white"
          )}
        >
          {status.toLowerCase()}
        </Badge>
      );
    },
  },

  // Coluna Data de Vencimento
  {
    accessorKey: "dataVencimento",
    header: "Vencimento",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dataVencimento"));
      return <div>{date.toLocaleDateString("pt-MZ")}</div>;
    },
  },

  // Coluna Ações
  {
    id: "actions",
    cell: ({ row }) => {
      const emprestimo = row.original;
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
              onClick={() => navigator.clipboard.writeText(emprestimo.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>Ver Cliente</DropdownMenuItem>
            <DropdownMenuItem>Ver Pagamentos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];