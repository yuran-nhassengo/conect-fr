"use client";

import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/app/services/axiosInstance";

// ---------- Helpers ----------
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// ---------- Botão ----------
const Button = ({ children, className, variant = "default", size = "default", disabled, ...props }: any) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
      : "bg-blue-600 text-white hover:bg-blue-700 shadow-md";
  const sizeStyles = "h-10 px-4 py-2";
  return (
    <button className={cn(base, variantStyles, sizeStyles, className)} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

// ---------- Schema Zod ----------
const formSchema = z.object({
  nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  contacto: z.string().regex(/^8[2-79]\d{8}$/, { message: "Contacto inválido. Use o formato 8XXXXXXXX." }),
  email: z.string().email({ message: "Email inválido." }).optional().or(z.literal("")),
  bi: z.string().min(5, { message: "O BI deve ter pelo menos 5 caracteres." }).optional().or(z.literal("")),
});

// ---------- Componente Inline ----------
export function AddClientInline({ onSubmitSuccess }: { onSubmitSuccess?: (data: z.infer<typeof formSchema>) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", contacto: "", email: "", bi: "" },
  });

  const { handleSubmit, control, reset, formState: { isSubmitting, errors } } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await axiosInstance.post("/clientes", values);

    const clienteCriado = response.data;

    toast({
      title: "Sucesso!",
      description: `Cliente ${clienteCriado.nome} registado com sucesso.`,
    });

    setSubmissionSuccess(true);
    reset();
    onSubmitSuccess?.(clienteCriado);

    setTimeout(() => {
      setSubmissionSuccess(false);
      setIsOpen(false);
    }, 2000);

  } catch (error: any) {
    console.error("Erro ao criar cliente:", error);

    const msg =
      error.response?.data?.message ||
      "Falha ao criar o cliente. Verifique os dados.";

    toast({
      title: "Erro!",
      description: msg,
    });
  }
};


  return (
    <div className="w-full">
    

     
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md space-y-6">
            {submissionSuccess && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg font-semibold text-sm">
                ✅ Cliente registado com sucesso!
              </div>
            )}

            {/* Nome */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nome Completo</label>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => <input {...field} placeholder="Nome do Cliente" className="w-full border rounded-lg p-2" />}
              />
              {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
            </div>

            {/* Contacto */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Contacto (8XXXXXXXX)</label>
              <Controller
                name="contacto"
                control={control}
                render={({ field }) => <input {...field} placeholder="841234567" className="w-full border rounded-lg p-2" />}
              />
              {errors.contacto && <p className="text-red-500 text-sm">{errors.contacto.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email (Opcional)</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input type="email" {...field} placeholder="email@exemplo.com" className="w-full border rounded-lg p-2" />}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* BI */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">BI / NIF (Opcional)</label>
              <Controller
                name="bi"
                control={control}
                render={({ field }) => <input {...field} placeholder="100010001" className="w-full border rounded-lg p-2" />}
              />
              {errors.bi && <p className="text-red-500 text-sm">{errors.bi.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              {isSubmitting ? "A registar..." : "Registar Cliente"}
            </Button>
          </form>
        </FormProvider>
    
    </div>
  );
}
