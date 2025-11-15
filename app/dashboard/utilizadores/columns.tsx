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

// Definição do Tipo de Dados para um Utilizador (Mock)
// Baseado no seu schema: User com role, name, email
export type UserMock = {
  id: string;
  name: string;
  email: string;
  role: "EMPRESA_DONO" | "FUNCIONARIO" | "CLIENTE";
  createdAt: string;
};

export const columns: ColumnDef<UserMock>[] = [
  // Coluna Nome (Filtro Principal)
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div className="pl-4 font-medium">{row.getValue("name")}</div>,
  },

  // Coluna Email
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("email")}</div>
    ),
  },
  
  // Coluna Cargo (Role)
  {
    accessorKey: "role",
    header: "Cargo",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      return (
        <Badge
          variant={
            role === "EMPRESA_DONO"
              ? "default"
              : role === "FUNCIONARIO"
              ? "secondary"
              : "outline"
          }
          className={cn(
            "capitalize",
            role === "EMPRESA_DONO" && "bg-indigo-600 hover:bg-indigo-700 text-white",
            role === "CLIENTE" && "bg-gray-200 text-gray-800"
          )}
        >
          {role.toLowerCase().replace('_', ' ')}
        </Badge>
      );
    },
  },

  // Coluna Data de Criação
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString("pt-MZ")}</div>;
    },
  },

  // Coluna Ações
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
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
            <DropdownMenuItem>Editar Cargo</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Suspender Utilizador
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];