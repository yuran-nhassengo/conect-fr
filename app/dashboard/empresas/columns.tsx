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

// Tipo de dados da Empresa
export type EmpresaMock = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: "ATIVA" | "PENDENTE" | "BLOQUEADA";
  registadoPor: string;
};

// Colunas da tabela
export const columns: ColumnDef<EmpresaMock>[] = [
  // Coluna ID
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="pl-4 font-medium">{row.getValue("id")}</div>,
  },

  // Coluna Nome
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome da Empresa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="pl-4 font-medium">{row.getValue("nome")}</div>,
  },

  // Coluna Email
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-sm">{row.getValue("email")}</div>,
  },

  // Coluna Telefone
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => <div className="text-sm">{row.getValue("telefone")}</div>,
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
            status === "ATIVA"
              ? "default"
              : status === "PENDENTE"
              ? "secondary"
              : "destructive"
          }
          className={cn("capitalize")}
        >
          {status.toLowerCase()}
        </Badge>
      );
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
      const empresa = row.original;
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
              onClick={() => navigator.clipboard.writeText(empresa.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
