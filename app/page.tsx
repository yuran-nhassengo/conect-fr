"use client";



import {
  DollarSign,
  BarChart,
  CheckCircle,
  Briefcase,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Zap,
  Link,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicHeader } from "./compontes/public-header";

// Componente para os cartões de "Sinais de Confiança"
const TrustCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  const Icon = icon;
  return (
    <div className="rounded-lg bg-white/90 p-4 text-center shadow-lg backdrop-blur-sm dark:bg-gray-950/90">
      <Icon className="mx-auto h-8 w-8 text-primary" />
      <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

// Componente para os cartões de Missão/Visão/Objectivo
const InfoCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  const Icon = icon;
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Icon className="h-10 w-10 text-primary" />
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Secção Hero (Baseada na Imagem de Referência) */}
        <section
          id="inicio"
          className="relative flex h-[80vh] min-h-[600px] w-full items-center justify-center py-12 md:py-24 lg:py-32"
        >
          {/* Imagem de Fundo */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://placehold.co/1600x900/a7a7a1/4d4d4d?text=Imagem+Inspiradora+de+Empreendedorismo"
              alt="Fundo"
              className="h-full w-full object-cover"
            />
            {/* Sobreposição (Overlay) */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Conteúdo Sobreposto */}
          <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              A Gestão de Micro-Crédito,
              <br />
              <span className="text-primary">Simples e Poderosa.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
              Conecta-Crédito é a plataforma unificada que centraliza a sua
              operação, automatiza pagamentos e protege o seu negócio com
              análise de risco.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="#precos">Começar Agora</Link>
              </Button>
            </div>

            {/* Sinais de Confiança (Baseado na Imagem de Referência) */}
            <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TrustCard
                icon={ShieldCheck}
                title="Segurança Total"
                description="Dados de clientes e empresas 100% privados e seguros."
              />
              <TrustCard
                icon={Zap}
                title="Automatização"
                description="Renovação de juros e gestão de pagamentos automática."
              />
              <TrustCard
                icon={Users}
                title="Multi-Utilizador"
                description="Portais dedicados para Clientes, Funcionários e Donos."
              />
            </div>
          </div>
        </section>

        {/* Secção Sobre Nós (Missão, Visão, Objectivo) */}
        <section
          id="sobre"
          className="w-full bg-gray-50 py-20 md:py-32 dark:bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              O Nosso Compromisso
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <InfoCard
                icon={Target}
                title="Missão"
                description="Fornecer uma ferramenta acessível e poderosa que digitaliza, automatiza e protege as operações de micro-crédito, impulsionando a inclusão financeira."
              />
              <InfoCard
                icon={Eye}
                title="Visão"
                description="Ser a plataforma central de gestão e análise de risco para todas as instituições de micro-finanças em Moçambique e além."
              />
              <InfoCard
                icon={Briefcase}
                title="Objectivo"
                description="Centralizar a gestão de clientes, empréstimos e pagamentos numa interface única, intuitiva e segura, acessível a partir de qualquer dispositivo."
              />
            </div>
          </div>
        </section>

        {/* Secção de Funcionalidades */}
        <section id="funcionalidades" className="w-full py-20 md:py-32">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Uma Plataforma, Controlo Total
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={DollarSign}
                title="Gestão de Empréstimos"
                description="Crie, acompanhe e liquide empréstimos. O sistema calcula juros e totais automaticamente."
              />
              <FeatureCard
                icon={CheckCircle}
                title="Lógica de Pagamentos"
                description="Registe pagamentos de juros (com renovação automática), amortizações ou liquidação total."
              />
              <FeatureCard
                icon={BarChart}
                title="Central de Risco"
                description="Receba notificações se um novo cliente tiver um histórico de incumprimento noutra instituição."
              />
            </div>
          </div>
        </section>

        {/* Secção de Preços */}
        <section
          id="precos"
          className="w-full bg-gray-50 py-20 md:py-32 dark:bg-gray-900"
        >
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Um Plano Simples para o Seu Sucesso
            </h2>
            <div className="mx-auto max-w-md">
              <Card className="shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-bold">
                    999 MT
                    <span className="text-lg font-normal text-muted-foreground">
                      /mês
                    </span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Por cada funcionário (user) registado.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Clientes ilimitados
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Empréstimos ilimitados
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Portal do Cliente incluído
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Suporte 24/7
                    </li>
                  </ul>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/login">Começar Teste Gratuito</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <div>Footer</div> 
    </div>
  );
}

// Sub-componente para cartões de funcionalidade
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  const Icon = icon;
  return (
    <Card>
      <CardHeader>
        <Icon className="mb-4 h-10 w-10 text-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};