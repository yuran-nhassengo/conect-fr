"use client";

import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

// ---------- Schema Zod ----------
const userSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Email inválido."),
  role: z.enum(["EMPRESA_DONO", "FUNCIONARIO", "CLIENTE"], {
    required_error: "Selecione o tipo de utilizador.",
  }),
});

type UserFormValues = z.infer<typeof userSchema>;

// ---------- Componente ----------
export const AddUserForm: React.FC<{
  onSubmitSuccess?: (data: UserFormValues) => void;
}> = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "", role: "FUNCIONARIO" },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (data: UserFormValues) => {
    setIsSubmitting(true);
    try {
      // Simula envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Utilizador registado!",
        description: `O utilizador ${data.name} foi adicionado com sucesso.`,
      });

      reset();
      onSubmitSuccess?.(data);
    } catch {
      toast({ title: "Erro ao registar", description: "Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nome */}
          <div>
            <label className="block font-medium text-zinc-800 dark:text-zinc-100 mb-1">Nome:</label>
            <input
              type="text"
              placeholder="Digite o nome"
              {...register("name")}
              className="w-full border rounded-lg p-2 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-zinc-800 dark:text-zinc-100 mb-1">Email:</label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              {...register("email")}
              className="w-full border rounded-lg p-2 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium text-zinc-800 dark:text-zinc-100 mb-1">Tipo de Utilizador:</label>
            <select
              {...register("role")}
              className="w-full border rounded-lg p-2 bg-white text-black dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            >
              <option value="EMPRESA_DONO">Dono da Empresa</option>
              <option value="FUNCIONARIO">Funcionário</option>
              <option value="CLIENTE">Cliente</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-zinc-600 transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                A registar...
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                Registar Utilizador
              </>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
