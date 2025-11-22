"use client";

import React, { useState, useEffect } from "react";
import { AddUserForm } from "@/app/compontes/modals/add-user-modal";
import { columns, UserMock } from "./columns";
import { DataTable } from "./data-table";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // função para concatenar classes
import { useUtilizadores } from "@/app/hooks/useUtilizadores";


// ------------------ Botão Customizado ------------------
const Button = ({ children, className, variant = "default", size = "default", disabled, ...props }: any) => {
  let base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 hover:bg-blue-500 disabled:pointer-events-none";
  let variantStyles =
    variant === "outline"
      ? "border border-gray-400 bg-white text-gray-400 hover:bg-blue-500"
      : "bg-blue-600 text-black hover:bg-blue-700 shadow-md";
  let sizeStyles = "h-10 px-4 py-2";
  return (
    <button className={cn(base, variantStyles, sizeStyles, className)} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

// ------------------ Página Principal ------------------
export default function UtilizadoresPage() {

  const [isFormVisible, setIsFormVisible] = useState(false);

  const {data: users = [] , isLoading,isError} = useUtilizadores();


  // Adicionar novo usuário
  const handleAddUser = (newUser: UserMock) => {
    // setUsers((prev) => [
    //   ...prev,
    //   {
    //     ...newUser,
    //     id: `usr_${users.length + 1}`,
    //     createdAt: new Date().toISOString(),
    //   },
    // ]);
    setIsFormVisible(false); // Fecha o form
  };

  return (
    <div className="container mx-auto py-10">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestão de Utilizadores</h1>
        <Button onClick={() => setIsFormVisible(!isFormVisible)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {isFormVisible ? "Fechar Formulário" : "Adicionar Novo Utilizador"}
        </Button>
      </div>

      {/* Conteúdo: Formulário ou Tabela */}
      {isFormVisible ? (
        <AddUserForm
          onSubmitSuccess={(user) =>
            handleAddUser({
              ...user,
              role: user.role,
            })
          }
        />
      ) : (
        <DataTable
          columns={columns}
          data={users}
          filterColumnId="name"
          filterPlaceholder="Pesquisar por nome ou email..."
        />
      )}
    </div>
  );
}
