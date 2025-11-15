import { Landmark } from "lucide-react";
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

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Coluna Esquerda: Formulário */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-gray-50">
        <div className="w-full max-w-lg">

          {/* Card com 80% da altura da tela */}
          <Card className="border rounded-xl shadow-lg p-6 md:p-10 h-[80vh] flex flex-col justify-center">
            <CardHeader className="text-center sm:text-left">
              <CardTitle className="text-4xl font-bold">
                Bem-vindo de Volta
              </CardTitle>
              <CardDescription className="mt-2 text-lg">
                Use as suas credenciais para aceder ao seu portal.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 mt-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@dominio.com"
                  required
                  className="h-12 text-base focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-medium">
                    Senha
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Esqueceu-se da senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  className="h-12 text-base focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-4">
              <Button className="w-full h-14 text-lg font-semibold">
                Login
              </Button>
              <div className="text-center text-sm text-gray-500">
                Não tem uma conta?{" "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Registe-se
                </Link>
              </div>
            </CardFooter>
          </Card>

        </div>
      </div>

      {/* Coluna Direita: Testemunho */}
      <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="w-full max-w-md space-y-8">
          <Landmark size={48} />
          <div className="space-y-4">
            <blockquote className="text-2xl font-semibold">
              &ldquo;Este software mudou a forma como gerimos os nossos clientes.
              A automatização dos juros poupa-nos dezenas de horas por mês.&rdquo;
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
