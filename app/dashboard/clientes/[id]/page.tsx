"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useParams, useRouter } from "next/navigation";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/services/axiosInstance";
import { useCliente } from "@/app/hooks/useCliente";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useCriarContaCliente } from "@/app/hooks/useCriarContaCliente";




export default function ClienteDetalhePage() {
   const params = useParams();
  const router = useRouter();
    const clienteId = Number(params?.id);

    const criarConta = useCriarContaCliente();



  const { data: cliente, isLoading, isError } = useCliente(clienteId);


  const [showRenovar, setShowRenovar] = useState(false);
const [novaDataVencimento, setNovaDataVencimento] = useState<Date | null>(null);
const [novoJuros, setNovoJuros] = useState<number | null>(null);


  // Estados controlados
  const [nome, setNome] = useState("");
  const [contacto, setContacto] = useState("");
  const [email, setEmail] = useState("");
  const [bi, setBi] = useState("");
  const [morada, setMorada] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [genero, setGenero] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Atualiza os estados somente quando o cliente mudar
  useEffect(() => {
    if (!cliente) return;

    setNome(cliente.nome || "");
    setContacto(cliente.contacto || "");
    setEmail(cliente.email || "");
    setBi(cliente.bi || "");
    setMorada(cliente.morada || "");
    setDataNascimento(cliente.dataNascimento ? new Date(cliente.dataNascimento) : null);
    setGenero(cliente.genero || "");
  }, [cliente]);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar cliente</p>;

  const handleCancelar = () => {
    setNome(cliente.nome || "");
    setContacto(cliente.contacto || "");
    setEmail(cliente.email || "");
    setBi(cliente.bi || "");
    setMorada(cliente.morada || "");
    setDataNascimento(cliente.dataNascimento ? new Date(cliente.dataNascimento) : null);
    setGenero(cliente.genero || "");
    setIsEditing(false);
  };


  const handleRenovarEmprestimo = async () => {
  try {
    await axiosInstance.post(`/emprestimos/${cliente.emprestimos[0].id}/renovar`, {
      novaDataVencimento: novaDataVencimento, 
       novaTaxaJuros: novoJuros, 
    });
    setShowRenovar(false);
    // Aqui você pode refazer o fetch do cliente/emprestimos
  } catch (err) {
    console.error(err);
  }
};

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Chamada à API para atualizar
      await axiosInstance.patch(`/clientes/${cliente.id}`, {
        nome,
        contacto,
        email,
        bi,
        morada,
        dataNascimento,
        genero,
      });
      setIsEditing(false);
      // Aqui você pode invalidar query ou refetch
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Cliente</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUNA ESQUERDA */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label>Nome Completo</Label>
              <Input  disabled={!isEditing} value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div>
              <Label>Contacto</Label>
              <Input  disabled={!isEditing} value={contacto} onChange={(e) => setContacto(e.target.value)} />
            </div>

            <div>
              <Label>Email</Label>
              <Input  disabled={!isEditing} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label>BI</Label>
              <Input  disabled={!isEditing} value={bi} onChange={(e) => setBi(e.target.value)} />
            </div>

            <div>
              <Label>Morada</Label>
              <Input  disabled={!isEditing} value={morada} onChange={(e) => setMorada(e.target.value)} />
            </div>

              {/* 🔥 Data Picker */}
            <div className="flex flex-col">
              <Label>Data de Nascimento</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={!isEditing}
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {dataNascimento ? format(dataNascimento, "dd/MM/yyyy") : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={dataNascimento || undefined}
                    onSelect={(date) => setDataNascimento(date ?? null)}
                  />
                </PopoverContent>
              </Popover>
            </div>

               {/* 🔥 Gênero (Select) */}
            <div>
              <Label>Gênero</Label>
              <select
                disabled={!isEditing}
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-800"
              >
                <option value="">Selecione</option>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
                <option value="OUTRO">Outro</option>
              </select>
            </div>

             {/* BOTÕES */}
        {!isEditing ? (
          <Button
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        ) : (
          <div className="flex gap-2 mt-3">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Guardar Alterações
            </Button>

            <Button
              className="flex-1 bg-red-500 hover:bg-red-600"
              variant="secondary"
              onClick={handleCancelar}
            >
              Cancelar
            </Button>
          </div>
        )}
          </CardContent>
        </Card>

        {/* COLUNA DIREITA */}
        <div className="space-y-6">
        <Card>
  <CardHeader>
    <CardTitle className="text-center w-full" >Situação Atual</CardTitle>
  </CardHeader>
    <CardContent className="space-y-3">
           {cliente.dividaAtual && cliente.dividaAtual > 0 ? (
  <>
   <div className="mb-4 flex items-center gap-3">
  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
    Dívida Atual:
  </p>

  <p className="text-4xl font-extrabold text-red-600 tracking-tight">
    {cliente.dividaAtual} MZN
  </p>
</div>


    <div className="space-y-4">
      {cliente.emprestimos?.map((emp) => (
        <div
          key={emp.id}
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition duration-200"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Empréstimo #{emp.id}
            </p>

            {emp.atrasado && (
              <span className="text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-700">
                ATRASADO
              </span>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold">Valor Emprestado:</span>{" "}
              {emp.valorPrincipal} MZN
            </p>
            <p>
              <span className="font-semibold">Juros:</span>{" "}
              {emp.juros.toFixed(2)} MZN
            </p>
            <p>
              <span className="font-semibold">Total a Pagar:</span>{" "}
              {emp.totalDevido.toFixed(2)} MZN
            </p>
            <p>
              <span className="font-semibold">Data do Empréstimo:</span>{" "}
              {new Date(emp.dataEmprestimo).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Data de Vencimento:</span>{" "}
              {new Date(emp.dataVencimento).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </>
) : (
  <p className="text-green-600 font-semibold text-lg">
    Sem dívidas atualmente
  </p>
)}

      </CardContent>
</Card>

         

          <Card className="border rounded-xl p-6">
  <CardHeader>
    <CardTitle>Estado da Conta</CardTitle>
    <CardDescription>Estado da conta de acesso do cliente</CardDescription>
  </CardHeader>

  <CardContent className="space-y-3">

    {/* Estado visual */}
    {!(cliente?.user) && (
      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
        Conta não criada
      </Badge>
    )}

    {cliente?.user && !cliente.user.isBlocked && (
      <Badge variant="outline" className="text-green-600 border-green-600">
        Conta ativa
      </Badge>
    )}

    {cliente?.user && cliente.user.isBlocked && (
      <Badge variant="destructive">
        Conta bloqueada
      </Badge>
    )}

  </CardContent>

  <CardFooter>
 {!cliente?.user ? (
  <Button
    className="w-full"
    onClick={() => criarConta.mutate(cliente.id)}
    disabled={criarConta.isPending}
  >
    {criarConta.isPending ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        A criar conta...
      </>
    ) : (
      "Criar Conta"
    )}
  </Button>
) : (
  <Button
    onClick={() => router.push(`/usuarios/${cliente.user.id}`)}
    className="w-full"
  >
    Gerir Conta
  </Button>
)}

  </CardFooter>
</Card>

<div className="flex gap-2 mt-2">
  {cliente.emprestimos?.some(emp => emp.status === 'ATIVO' || emp.status === 'ATRASADO') ? (
    // RENOVAÇÃO
    <Button
      className="flex-1 bg-yellow-600 hover:bg-yellow-700"
      onClick={() => setShowRenovar(true)}
    >
      Renovar Empréstimo
    </Button>
  ) : (
    // NOVO EMPRÉSTIMO
    <Button
      className="flex-1 bg-blue-600 hover:bg-blue-700"
      onClick={() => router.push(`/emprestimos/criar?cliente=${cliente.id}`)}
    >
      Novo Empréstimo
    </Button>
  )}

  <Button
    className="flex-1 bg-green-600 hover:bg-green-700"
    onClick={() => router.push(`/pagamentos?clienteId=${cliente.id}`)}
  >
    Fazer Pagamento
  </Button>
</div>

{/* MODAL/SEÇÃO DE RENOVAÇÃO */}
{showRenovar && (
  <Card className="mt-4 border rounded-xl p-6">
    <CardHeader>
      <CardTitle>Renovar Empréstimo</CardTitle>
      <CardDescription>Defina nova data de vencimento e juros</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      {/* Data de Vencimento */}
      <div className="flex flex-col">
        <Label>Nova Data de Vencimento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {novaDataVencimento ? format(novaDataVencimento, "dd/MM/yyyy") : "Selecione uma data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={novaDataVencimento || undefined}
              onSelect={(date) => setNovaDataVencimento(date ?? null)}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Juros */}
      <div>
        <Label>Novo Percentual de Juros (%)</Label>
        <Input
          type="number"
          value={novoJuros}
          onChange={(e) => setNovoJuros(Number(e.target.value))}
        />
      </div>
    </CardContent>

    <CardFooter className="flex gap-2">
      <Button
        className="flex-1 bg-yellow-600 hover:bg-yellow-700"
        onClick={handleRenovarEmprestimo}
        disabled={!novaDataVencimento || !novoJuros}
      >
        Renovar
      </Button>
      <Button
        className="flex-1 bg-red-500 hover:bg-red-600"
        variant="secondary"
        onClick={() => setShowRenovar(false)}
      >
        Cancelar
      </Button>
    </CardFooter>
  </Card>
)}

        </div>
      </div>
    </div>
  );
}
