"use client"

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
import { useState } from "react";
import { loginUser } from "@/app/services/auth";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/AuthHeader";

export default function LoginPage() {

   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser({ email, password });

      console.log('Token recebido:', data.accessToken);

      // Salva token no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.accessToken);
      }

      // Decodifica o token para pegar o role (JWT padrão)
      const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
      const role = payload.role;

      // Redireciona de acordo com o role
      if (role === 'ADMIN' || role === 'EMPRESA_DONO' || role === 'FUNCIONARIO') {
        router.push('/dashboard'); // página do dashboard
      } else {
        router.push('/'); // usuário comum ou cliente
      }

    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <><AuthHeader page="login" />
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
       
      {/* Coluna Esquerda: Formulário */}
      <div className="flex items-center justify-center p-2 md:p-12 bg-gray-100">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">

          {/* Card com 80% da altura da tela */}
           <Card className="bg-white rounded-2xl shadow-xl p-2 md:p-10 h-[80vh] flex flex-col justify-center border-0">

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
                   value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                   onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-4">
             <Button
                className="w-full h-14 text-lg font-semibold"
                onClick={handleLogin} // <-- aqui
                disabled={loading}
              >
                {loading ? 'Acessando...' : 'Login'}
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
     <div className="hidden lg:flex items-center justify-center p-0">
        <div className="relative w-full h-[100vh]">
          {/* Imagem de fundo */}
          <img
            src="/images/login.png"
            alt="Equipe diversa trabalhando"
            className="w-full h-full object-cover"
          />

          {/* Degradê para legibilidade do texto (da direita para a esquerda) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/40 via-transparent to-transparent"></div>

          {/* Container do texto (alinhado à direita) */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 max-w-md text-right pr-6">
            <blockquote className="text-white text-2xl font-semibold leading-relaxed drop-shadow-md">
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
