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

// Definição do Tipo de Dados para um Cliente (Mock)
export type ClienteMock = {
  id: string;
  nome: string;
  nif: string; // Baseado no campo 'bi' do backend
  email: string;
  telefone: string;
  status: "ATIVO" | "INATIVO" | "PENDENTE";
};

export const columns: ColumnDef<ClienteMock>[] = [
  // Coluna Nome (Filtro Principal)
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-4 font-medium">{row.getValue("nome")}</div>,
  },

  // Coluna NIF (Número de Identificação Fiscal)
  {
    accessorKey: "nif",
    header: "NIF",
  },
  
  // Coluna Email
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
    ),
  },

  // Coluna Telefone
  {
    accessorKey: "telefone",
    header: "Telefone",
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
            status === "INATIVO"
              ? "destructive"
              : status === "ATIVO"
              ? "default"
              : "outline"
          }
          className={cn(
            "capitalize",
            status === "PENDENTE" && "bg-yellow-500 text-white hover:bg-yellow-600"
          )}
        >
          {status.toLowerCase()}
        </Badge>
      );
    },
  },

  // Coluna Ações
  {
    id: "actions",
    cell: ({ row }) => {
      const cliente = row.original;
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
              onClick={() => navigator.clipboard.writeText(cliente.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
            <DropdownMenuItem>Ver Histórico de Empréstimos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];