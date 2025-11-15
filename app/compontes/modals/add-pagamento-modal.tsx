"use client";

import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

// ---------- Mock Empréstimos ----------
const mockEmprestimos = [
  { id: "EMP-2024-001", cliente: "Ana Silva", valorEmFalta: 45000 },
  { id: "EMP-2024-005", cliente: "João Mário", valorEmFalta: 120000 },
  { id: "EMP-2024-008", cliente: "Carla Pinho", valorEmFalta: 9000 },
];

// ---------- Enum ----------
const PagamentoTipo = {
  JUROS: "JUROS",
  AMORTIZACAO: "AMORTIZACAO",
  LIQUIDACAO_TOTAL: "LIQUIDACAO_TOTAL",
};

// ---------- Schema Zod ----------
const formSchema = z.object({
  emprestimoId: z.string({ required_error: "Selecione um empréstimo." }),
  valorPago: z.coerce.number().min(1, { message: "O valor pago deve ser maior que zero." }),
  tipo: z.nativeEnum(PagamentoTipo, { required_error: "Selecione o tipo de pagamento." }),
  dataPagamento: z.date({ required_error: "A data do pagamento é obrigatória." }),
});

// ---------- Helpers ----------
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// ---------- Botão ----------
const Button = ({ children, className, variant = "default", size = "default", disabled, ...props }: any) => {
  let base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";
  let variantStyles =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
      : "bg-blue-600 text-white hover:bg-blue-700 shadow-md";
  let sizeStyles = "h-10 px-4 py-2";
  return (
    <button className={cn(base, variantStyles, sizeStyles, className)} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

// ---------- Função para formatar moeda ----------
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN", minimumFractionDigits: 2 }).format(value);

// ---------- Componente Inline ----------
export function AddPagamentoInline({ onSubmitSuccess }: { onSubmitSuccess?: (data: z.infer<typeof formSchema>) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { emprestimoId: "", valorPago: 0, tipo: PagamentoTipo.JUROS, dataPagamento: new Date() },
  });

  const { handleSubmit, control, reset, formState: { isSubmitting, errors } } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const emprestimo = mockEmprestimos.find(e => e.id === values.emprestimoId);

    console.log("Dados do Pagamento:", values);

    await new Promise(resolve => setTimeout(resolve, 1500)); // simula envio API

    toast({ title: "Sucesso!", description: `Pagamento de ${formatCurrency(values.valorPago)} registado para ${emprestimo?.cliente}.` });

    setSubmissionSuccess(true);
    reset();
    onSubmitSuccess?.(values);

    setTimeout(() => {
      setSubmissionSuccess(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="w-full">
    

   
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md space-y-6">
            {submissionSuccess && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg font-semibold text-sm">
                ✅ Pagamento registado com sucesso!
              </div>
            )}

            {/* Empréstimo */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Empréstimo</label>
              <Controller
                name="emprestimoId"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full border rounded-lg p-2">
                    <option value="">Selecione um empréstimo</option>
                    {mockEmprestimos.map(e => (
                      <option key={e.id} value={e.id}>
                        {e.cliente} - Falta: {formatCurrency(e.valorEmFalta)}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.emprestimoId && <p className="text-red-500 text-sm">{errors.emprestimoId.message}</p>}
            </div>

            {/* Valor Pago */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Valor Pago (MT)</label>
              <Controller
                name="valorPago"
                control={control}
                render={({ field }) => <input type="number" {...field} className="w-full border rounded-lg p-2" />}
              />
              {errors.valorPago && <p className="text-red-500 text-sm">{errors.valorPago.message}</p>}
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tipo de Pagamento</label>
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full border rounded-lg p-2">
                    <option value={PagamentoTipo.JUROS}>Juros (Renovação)</option>
                    <option value={PagamentoTipo.AMORTIZACAO}>Amortização (Capital)</option>
                    <option value={PagamentoTipo.LIQUIDACAO_TOTAL}>Liquidação Total</option>
                  </select>
                )}
              />
              {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo.message}</p>}
            </div>

            {/* Data */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Data do Pagamento</label>
              <Controller
                name="dataPagamento"
                control={control}
                render={({ field }) => (
                  <Input type="date" {...field} className="w-full border rounded-lg p-2" />
                )}
              />
              {errors.dataPagamento && <p className="text-red-500 text-sm">{errors.dataPagamento.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              {isSubmitting ? "A registar..." : "Registar Pagamento"}
            </Button>

            <Button type="button" className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-black" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </form>
        </FormProvider>
     
    </div>
  );
}
