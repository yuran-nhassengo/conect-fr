import { Landmark } from "lucide-react";
import Link from "next/link";

// Assumindo que você instalou (instalou) estes componentes do shadcn/ui
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

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Coluna Esquerda: O Formulário de Cadastro */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Link "Voltar" para a página inicial */}
          <Button variant="outline" asChild className="absolute top-4 left-4">
            <Link href="/">Voltar</Link>
          </Button>

          <Card className="border-0 shadow-none sm:border sm:shadow-sm">
            <CardHeader className="text-center sm:text-left">
              <CardTitle className="text-2xl font-bold">
                Criar a sua Conta
              </CardTitle>
              <CardDescription>
                Registe-se para começar a gerir os seus créditos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" type="text" placeholder="Seu Nome" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@dominio.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <Input id="confirm-password" type="password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full h-11 text-base">
                Criar Conta
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link
                  href="/login" // Link para a página de login
                  className="font-medium text-primary hover:underline"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Coluna Direita: O Testemunho (Igual à de Login) */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="w-full max-w-md space-y-8">
          <Landmark size={48} />
          <div className="space-y-4">
            <blockquote className="text-2xl font-semibold">
              &ldquo;Este software mudou a forma como gerimos os nossos clientes.
              A automatização dos juros poupa-nos dezenas de horas por
              mês.&rdquo;
            </blockquote>
            <div>
              <div className="font-bold">Ana Silva</div>
              <div className="text-sm text-blue-100">
                Dona, Micro-Crédito Confiança
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}