"use client";

import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Loader2, Calendar as CalendarIcon, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

// ---------- Mock Clientes ----------
const mockClientes = [
  { id: "clt_1", nome: "Ana Silva" },
  { id: "clt_2", nome: "João Mário" },
  { id: "clt_3", nome: "Carla Pinho" },
];

// ---------- Schema Zod ----------
const formSchema = z.object({
  clienteId: z.string({ required_error: "Selecione um cliente." }),
  valorPrincipal: z.coerce.number().min(100, { message: "O valor deve ser de pelo menos 100 MT." }),
  jurosPercent: z.coerce.number().min(5).max(100, { message: "A taxa deve estar entre 5% e 100%." }),
  dataEmprestimo: z.date({ required_error: "A data do empréstimo é obrigatória." }),
  dataVencimento: z.date({ required_error: "A data de vencimento é obrigatória." }),
  bemPenhorado: z.string().optional().or(z.literal("")),
});

// ---------- Componente Inline ----------
export function AddEmprestimoInline({ onOpenChangeCards }: { onOpenChangeCards?: (open: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clienteId: "",
      valorPrincipal: 0,
      jurosPercent: 0,
      dataEmprestimo: new Date(),
      dataVencimento: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      bemPenhorado: "",
    },
  });

  const { isSubmitting } = form.formState;

  const toggleForm = () => {
    setIsOpen(!isOpen);
    onOpenChangeCards?.(!isOpen);
    if (isOpen) {
      form.reset();
      setSubmissionSuccess(false);
    }
  };

  const onSubmit = async (values: any) => {
    console.log("Dados do Empréstimo:", values);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const jurosCalculado = values.valorPrincipal * (values.jurosPercent / 100);
    const valorTotal = values.valorPrincipal + jurosCalculado;

    toast({ title: "Empréstimo Registado!", description: `Total a pagar: ${valorTotal.toFixed(2)} MT.` });

    setSubmissionSuccess(true);
    form.reset();
    setTimeout(() => {
      setIsOpen(false);
      setSubmissionSuccess(false);
      onOpenChangeCards?.(true);
    }, 2000);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-black">Adicionar Novo Empréstimo</CardTitle>
      </CardHeader>
      <CardContent>
      
     
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {submissionSuccess && (
                <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg font-semibold text-sm">
                  ✅ Empréstimo registado com sucesso!
                </div>
              )}

              {/* Cliente */}
              <div className="space-y-2">
                <Label className="text-black">Cliente</Label>
                <Controller
                  name="clienteId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-between text-black">
                            {mockClientes.find(c => c.id === field.value)?.nome || "Selecione um cliente"}
                            <PlusCircle className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          {mockClientes.map(c => (
                            <Button key={c.id} variant="ghost" className="w-full justify-start text-black" onClick={() => field.onChange(c.id)}>
                              {c.nome}
                            </Button>
                          ))}
                        </PopoverContent>
                      </Popover>
                      {fieldState.error && <p className="text-sm text-black">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </div>

              {/* Valor e Juros */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-black">Valor Principal (MT)</Label>
                  <Controller
                    name="valorPrincipal"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                        {fieldState.error && <p className="text-sm text-black">{fieldState.error.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-black">Juros (%)</Label>
                  <Controller
                    name="jurosPercent"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <>
                        <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                        {fieldState.error && <p className="text-sm text-black">{fieldState.error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Datas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-black">Data Empréstimo</Label>
                  <Controller
                    name="dataEmprestimo"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-black">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP", { locale: pt }) : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Button variant="ghost" className="w-full justify-start text-black" onClick={() => field.onChange(new Date())}>
                            Hoje
                          </Button>
                        </PopoverContent>
                        {fieldState.error && <p className="text-sm text-black">{fieldState.error.message}</p>}
                      </Popover>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-black">Data Vencimento</Label>
                  <Controller
                    name="dataVencimento"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-black">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP", { locale: pt }) : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Button variant="ghost" className="w-full justify-start text-black" onClick={() => field.onChange(new Date())}>
                            Hoje
                          </Button>
                        </PopoverContent>
                        {fieldState.error && <p className="text-sm text-black">{fieldState.error.message}</p>}
                      </Popover>
                    )}
                  />
                </div>
              </div>

              {/* Bem Penhorado */}
              <div className="space-y-2">
                <Label className="text-black">Bem Penhorado (Opcional)</Label>
                <Controller
                  name="bemPenhorado"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <>
                      <Input placeholder="Ex: Motocicleta Yamaha" {...field} />
                      {fieldState.error && <p className="text-sm text-black">{fieldState.error.message}</p>}
                    </>
                  )}
                />
              </div>

              <Button type="submit" className="w-full text-black bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                {isSubmitting ? "A registar..." : "Registar Empréstimo"}
              </Button>
            </form>
          </FormProvider>
       
      </CardContent>
    </Card>
  );
}
