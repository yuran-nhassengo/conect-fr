"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Landmark } from "lucide-react";

import AuthHeader from "@/components/AuthHeader";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  // Estado dos campos
  const [empresa, setEmpresa] = useState({ nome: "", endereco: "", contacto: "",nuit:"" });
  const [user, setUser] = useState({ nome: "", email: "", senha: "", confirmarSenha: "" });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    // Aqui você pode enviar os dados da empresa + usuário para a API
    console.log({ empresa, user });
    alert("Cadastro enviado com sucesso!");
  };

  return (
    <>
    <AuthHeader page="register" />
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* Coluna Esquerda: Formulário */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-gray-100">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
          {/* Botão Voltar */}
             <Card className="bg-white rounded-2xl shadow-xl
            p-2 md:p-10 h-[80vh] flex flex-col justify-center border-0">
            <CardHeader className="text-center sm:text-left">
              <CardTitle className="text-2xl font-bold">
                {step === 1
                  ? "Dados da Empresa"
                  : step === 2
                  ? "Dados do Usuário"
                  : "Confirmação"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Preencha os dados da sua empresa."}
                {step === 2 && "Agora, cadastre o primeiro usuário."}
                {step === 3 && "Revise todos os dados antes de enviar."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Etapa 1: Empresa */}
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="empresa-nome">Nome da Empresa</Label>
                    <Input
                      id="empresa-nome"
                      type="text"
                      placeholder="Nome da Empresa"
                      value={empresa.nome}
                      onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="empresa-nome">Nuit da Empresa</Label>
                    <Input
                      id="empresa-nuit"
                      type="text"
                      placeholder="Nuit da Empresa"
                      value={empresa.nuit}
                      onChange={(e) => setEmpresa({ ...empresa, nuit: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa-endereco">Endereço</Label>
                    <Input
                      id="empresa-endereco"
                      type="text"
                      placeholder="Endereço"
                      value={empresa.endereco}
                      onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa-contacto">Contacto</Label>
                    <Input
                      id="empresa-contacto"
                      type="text"
                      placeholder="Telefone ou email"
                      value={empresa.contacto}
                      onChange={(e) => setEmpresa({ ...empresa, contacto: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              {/* Etapa 2: Usuário */}
              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="user-nome">Nome Completo</Label>
                    <Input
                      id="user-nome"
                      type="text"
                      placeholder="Nome Completo"
                      value={user.nome}
                      onChange={(e) => setUser({ ...user, nome: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="exemplo@dominio.com"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-senha">Senha</Label>
                    <Input
                      id="user-senha"
                      type="password"
                      placeholder="********"
                      value={user.senha}
                      onChange={(e) => setUser({ ...user, senha: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-confirmarSenha">Confirmar Senha</Label>
                    <Input
                      id="user-confirmarSenha"
                      type="password"
                      placeholder="********"
                      value={user.confirmarSenha}
                      onChange={(e) => setUser({ ...user, confirmarSenha: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

           {/* Etapa 3: Confirmação */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-center">Revise seus dados antes de enviar</h3>

              {/* Card Empresa */}
              <div className="border rounded-xl p-4 bg-gray-50 shadow-sm">
                <h4 className="text-lg font-semibold mb-2 text-gray-700">Empresa</h4>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="font-medium">Nome:</span> {empresa.nome || "Não preenchido"}
                  </p>
                  <p>
                    <span className="font-medium">Endereço:</span> {empresa.endereco || "Não preenchido"}
                  </p>
                  <p>
                    <span className="font-medium">Contacto:</span> {empresa.contacto || "Não preenchido"}
                  </p>
                </div>
              </div>

              {/* Card Usuário */}
              <div className="border rounded-xl p-4 bg-gray-50 shadow-sm">
                <h4 className="text-lg font-semibold mb-2 text-gray-700">Usuário</h4>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="font-medium">Nome:</span> {user.nome || "Não preenchido"}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email || "Não preenchido"}
                  </p>
                  <p>
                    <span className="font-medium">Senha:</span> {"•".repeat(user.senha.length || 8)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Se tudo estiver correto, clique em <strong>Enviar</strong> para finalizar o cadastro.
              </p>
            </div>
          )}
            </CardContent>

           <CardFooter className="flex justify-between mt-4">
            {/* Botão esquerdo */}
            {step === 1 && (
              <Button variant="outline" asChild>
                <Link href="/login">Cancelar</Link>
              </Button>
            )}

            {(step === 2 || step === 3) && (
              <Button variant="outline" onClick={prevStep}>
                Voltar
              </Button>
            )}

            {/* Botão direito */}
            {step < 3 ? (
              <Button className="ml-auto" onClick={nextStep}>Próximo</Button>
            ) : (
              <Button className="ml-auto" onClick={handleSubmit}>Enviar</Button>
            )}
          </CardFooter>
          </Card>
        </div>
      </div>

      {/* Coluna Direita: Testemunho */}
       <div className="hidden lg:flex items-center justify-center p-0">
        <div className="relative w-full h-[100vh]">
          {/* Imagem de fundo */}
          <img
            src="/images/cadastro.png"
            alt="Equipe diversa trabalhando"
            className="w-full h-full object-cover"
          />

          {/* Degradê para legibilidade do texto (da direita para a esquerda) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/40 via-transparent to-transparent"></div>

          {/* Container do texto (alinhado à direita) */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 max-w-md text-right pr-6">
            <blockquote className="text-black text-2xl font-semibold leading-relaxed drop-shadow-md">
              “Este software mudou a forma como gerimos os nossos clientes.
              A automatização dos juros poupa-nos dezenas de horas por mês.”
            </blockquote>
            <div className="mt-4 text-white/90 font-bold">Ana Silva</div>
            <div className="text-sm text-white/70">Dona, Micro-Crédito Confiança</div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}
