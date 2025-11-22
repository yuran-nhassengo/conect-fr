"use client";

import React, { useState, useMemo } from "react";
import { useForm, Controller, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useClientes } from "@/app/hooks/useClientes";
import { useCreateEmprestimo } from "@/app/hooks/useCreateEmprestimo";

// ---------- Schema ----------
const formSchema = z.object({
  clienteId: z.number().min(1,{ message: "Selecione um cliente." }),
  valorPrincipal: z.coerce.number().min(100, { message: "O valor deve ser de pelo menos 100 MT." }),
  jurosPercent: z.coerce.number().min(5).max(100, { message: "A taxa deve estar entre 5% e 100%." }),
  dataEmprestimo: z.date({ required_error: "A data do empréstimo é obrigatória." }),
  dataVencimento: z.date({ required_error: "A data de vencimento é obrigatória." }),
  bemPenhorado: z.string().optional().or(z.literal("")),
});

interface AddEmprestimoInlineProps {
  onOpenChangeCards?: (open: boolean) => void;
}

export function AddEmprestimoInline({ onOpenChangeCards }: AddEmprestimoInlineProps) {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [autoVencimento, setAutoVencimento] = useState(false);
  const [mensagemAuto, setMensagemAuto] = useState("");
  const [clienteQuery, setClienteQuery] = useState("");

  const { data: clientes } = useClientes();
  const createEmprestimo = useCreateEmprestimo();

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

  const watchAll = useWatch({ control: form.control });
  const { clienteId, valorPrincipal, jurosPercent, dataEmprestimo, dataVencimento, bemPenhorado } = watchAll;

  // --------------------------
  // 🔹 AUTO DEFINIR DATA DE VENCIMENTO
  React.useEffect(() => {
    if (!jurosPercent || !dataEmprestimo) return;

    let novaData: Date | null = null;
    let mensagem = "";

    if (jurosPercent === 15) {
      novaData = new Date(dataEmprestimo);
      novaData.setDate(novaData.getDate() + 7);
      mensagem = "Vencimento definido automaticamente: 7 dias após a data do empréstimo (15%).";
    }

    if (jurosPercent === 30) {
      novaData = new Date(dataEmprestimo);
      novaData.setDate(novaData.getDate() + 30);
      mensagem = "Vencimento definido automaticamente: 30 dias após a data do empréstimo (30%).";
    }

    if (novaData && novaData.getTime() !== dataVencimento?.getTime()) {
      setAutoVencimento(true);
      setMensagemAuto(mensagem);
      form.setValue("dataVencimento", novaData, { shouldValidate: true, shouldDirty: true });
      setTimeout(() => setAutoVencimento(false), 3000);
    }
  }, [jurosPercent, dataEmprestimo, form, dataVencimento]);

  // --------------------------
  // 🔹 PREVIEW DINÂMICO
  const preview = useMemo(() => {
    const cliente = clientes?.find(c => c.id === clienteId)?.nome || "—";
    const jurosCalculado = valorPrincipal * (jurosPercent / 100);
    const total = valorPrincipal + jurosCalculado;

    return {
      cliente,
      valor: valorPrincipal || 0,
      jurosPercent: jurosPercent || 0,
      jurosCalculado: isNaN(jurosCalculado) ? 0 : jurosCalculado,
      total: isNaN(total) ? 0 : total,
      dataEmprestimo: dataEmprestimo ? format(dataEmprestimo, "PPP", { locale: pt }) : "—",
      dataVencimento: dataVencimento ? format(dataVencimento, "PPP", { locale: pt }) : "—",
      bem: bemPenhorado || "Nenhum",
    };
  }, [clienteId, valorPrincipal, jurosPercent, dataEmprestimo, dataVencimento, bemPenhorado, clientes]);

  // --------------------------
  // 🔹 SUBMIT COM REACT QUERY
const onSubmit = async (values: any) => {

  console.log("verificando se onSubmit esta funcionar...",values);
  try {
    await createEmprestimo.mutateAsync(values); // aguarda a mutation
    const juros = values.valorPrincipal * (values.jurosPercent / 100);
    const total = values.valorPrincipal + juros;

    toast({
      title: "Empréstimo registado!",
      description: `Total a pagar: ${total.toFixed(2)} MT.`,
    });

    setSubmissionSuccess(true);
    form.reset();
    if (onOpenChangeCards) onOpenChangeCards(false);

    setTimeout(() => setSubmissionSuccess(false), 2000);
  } catch (err) {
    toast({
      title: "Erro ao registar empréstimo",
      description: "Tente novamente.",
    });
  }
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* FORMULÁRIO */}
      <Card className="h-fit">
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

             {/* CLIENTE - AUTOCOMPLETE CORRIGIDO */}
              <div className="space-y-2">
                <Label className="text-black">Cliente</Label>
                <Controller
                  name="clienteId"
                  control={form.control}
                  render={({ field }) => {
                    const filteredClientes = clientes?.filter(c =>
                      c.nome.toLowerCase().includes(clienteQuery.toLowerCase())
                    ) || [];

                    const selectedCliente = clientes?.find(c => c.id === field.value);

                    return (
                      <div className="relative">
                        <Input
                          placeholder="Digite o nome do cliente"
                          // Exibe o nome do cliente selecionado ou a query de busca
                          value={selectedCliente?.nome || clienteQuery}
                          onChange={e => {
                            const newValue = e.target.value;
                            setClienteQuery(newValue);

                            // LÓGICA CORRIGIDA:
                            // 1. Se houver um cliente selecionado E o usuário mudar o texto para algo diferente do nome dele,
                            // OU 2. Se não houver cliente selecionado e o campo for modificado,
                            // então limpamos o ID (field.onChange("")) para forçar a nova seleção
                            // e permitir que a validação do Zod funcione.
                            if (selectedCliente && selectedCliente.nome !== newValue) {
                                field.onChange(""); 
                            }
                            // Se o usuário limpar o texto (newValue for ""), também limpamos o ID
                            if (newValue === "") {
                                field.onChange("");
                            }
                          }}
                        />
                        {/* Exibe a lista suspensa de clientes filtrados */}
                        {clienteQuery && filteredClientes.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
                            {filteredClientes.map(c => (
                              <button
                                key={c.id}
                                className="w-full text-left px-3 py-2 hover:bg-blue-100"
                                onClick={() => {
                                  // Ao clicar, define o ID e limpa a query de busca
                                  field.onChange(c.id);
                                  setClienteQuery(""); 
                                }}
                              >
                                {c.nome}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                {/* ⚠️ RECOMENDAÇÃO: Adicione a exibição de erro para debug ⚠️ */}
                {form.formState.errors.clienteId && (
                    <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.clienteId.message}
                    </p>
                )}
              </div>

              {/* VALOR / JUROS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-black">Valor Principal (MT)</Label>
                  <Controller
                    name="valorPrincipal"
                    control={form.control}
                    render={({ field }) => (
                      <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-black">Juros (%)</Label>
                  <Controller
                    name="jurosPercent"
                    control={form.control}
                    render={({ field }) => (
                      <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                    )}
                  />
                </div>
              </div>

              {/* DATAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* DATA DO EMPRÉSTIMO */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-black font-semibold">Data do Empréstimo</Label>
                  <Controller
                    name="dataEmprestimo"
                    control={form.control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-black border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                            {field.value ? format(field.value, "PPP", { locale: pt }) : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={date => field.onChange(date)}
                            initialFocus
                          />
                          <Button
                            variant="ghost"
                            className="w-full mt-2 justify-start hover:bg-blue-100"
                            onClick={() => field.onChange(new Date())}
                          >
                            Hoje
                          </Button>
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>

                {/* DATA DE VENCIMENTO */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-black font-semibold">Data de Vencimento</Label>
                  {mensagemAuto && (
                    <p className="text-sm text-blue-600 animate-pulse">{mensagemAuto}</p>
                  )}
                  <Controller
                    name="dataVencimento"
                    control={form.control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-black border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-150 ${autoVencimento ? "border-blue-600 bg-blue-50 shadow-sm" : ""}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                            {field.value ? format(field.value, "PPP", { locale: pt }) : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={date => field.onChange(date)}
                            initialFocus
                          />
                          <Button
                            variant="ghost"
                            className="w-full mt-2 justify-start hover:bg-blue-100"
                            onClick={() => field.onChange(new Date())}
                          >
                            Hoje
                          </Button>
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
              </div>

              {/* BEM PENHORADO */}
              <div className="space-y-2">
                <Label className="text-black">Bem Penhorado (Opcional)</Label>
                <Controller
                  name="bemPenhorado"
                  control={form.control}
                  render={({ field }) => <Input placeholder="Ex: Motocicleta Yamaha" {...field} />}
                />
              </div>

           <Button
            type="submit"
            className="w-full text-black bg-blue-600 hover:bg-blue-700"
            disabled={createEmprestimo.isPending} // ✅ React Query v5
          >
            {createEmprestimo.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="mr-2 h-4 w-4" />
            )}
            {createEmprestimo.isPending ? "A registar..." : "Registar Empréstimo"}
          </Button>

            </form>
          </FormProvider>
        </CardContent>
      </Card>

      {/* PREVIEW */}
      <Card className="border-green-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-green-800">📌 Pré-visualização do Empréstimo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-black">
          <div className="flex items-center gap-2">
            <p className="font-semibold">Cliente:</p>
            <p>{preview.cliente}</p>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-semibold">Valor Principal:</p>
              <p>{preview.valor.toFixed(2)} MT</p>
            </div>

            <div>
              <p className="font-semibold">Juros:</p>
              <p>{preview.jurosPercent}% ({preview.jurosCalculado.toFixed(2)} MT)</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">💰 Total a pagar:</p>
            <p className="text-lg font-bold">{preview.total.toFixed(2)} MT</p>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-semibold">Data do Empréstimo:</p>
              <p>{preview.dataEmprestimo}</p>
            </div>

            <div>
              <p className="font-semibold">Data de Vencimento:</p>
              <p>{preview.dataVencimento}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold">Bem Penhorado:</p>
            <p>{preview.bem}</p>
          </div>

          <hr />
        </CardContent>
      </Card>
    </div>
  );
}
