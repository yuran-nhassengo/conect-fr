"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Importar os ícones
import {
  ArrowRight,
  Banknote,
  Users,
  Landmark,
  FileWarning,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Dados Falsos (Mock Data) ---

// Dados para os 4 cartões de KPI
const kpiData = [
  {
    title: "Total Emprestado",
    value: "1.250.000 MT",
    change: "+12% vs. mês passado",
    icon: Landmark,
    changeColor: "text-green-600",
  },
  {
    title: "Clientes Ativos",
    value: "132",
    change: "+5 clientes esta semana",
    icon: Users,
    changeColor: "text-green-600",
  },
  {
    title: "Total Juros (Mês)",
    value: "78.450 MT",
    change: "+2.5% vs. mês passado",
    icon: Banknote,
    changeColor: "text-green-600",
  },
  {
    title: "Empréstimos Atrasados",
    value: "9",
    change: "3 novos esta semana",
    icon: FileWarning,
    changeColor: "text-red-600", // Destaque em vermelho
  },
];

// Dados para o Gráfico de Barras (Cashflow)
const chartData = [
  { month: "Jan", Pago: 40000, Atrasado: 2400 },
  { month: "Fev", Pago: 30000, Atrasado: 1398 },
  { month: "Mar", Pago: 20000, Atrasado: 9800 },
  { month: "Abr", Pago: 27800, Atrasado: 3908 },
  { month: "Mai", Pago: 18900, Atrasado: 4800 },
  { month: "Jun", Pago: 23900, Atrasado: 3800 },
  { month: "Jul", Pago: 34900, Atrasado: 4300 },
];

// Dados para a Tabela de Clientes Recentes
const recentClientsData = [
  {
    id: "CLI-001",
    nome: "João Silva",
    status: "ATIVO",
    totalEmprestado: 50000,
    email: "joao.silva@exemplo.com",
  },
  {
    id: "CLI-002",
    nome: "Maria Sousa",
    status: "LIQUIDADO",
    totalEmprestado: 25000,
    email: "maria.sousa@exemplo.com",
  },
  {
    id: "CLI-003",
    nome: "Carlos Mendes",
    status: "ATRASADO",
    totalEmprestado: 100000,
    email: "carlos.mendes@exemplo.com",
  },
  {
    id: "CLI-004",
    nome: "Ana Pereira",
    status: "ATIVO",
    totalEmprestado: 15000,
    email: "ana.pereira@exemplo.com",
  },
];
// --- Fim dos Dados Falsos ---

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Título */}
      <h1 className="text-3xl font-bold tracking-tight">
        Dashboard da Empresa
      </h1>

      {/* 1. Grelha de KPIs (4 Cartões) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{kpi.value}</div>
                <p className={cn("text-xs", kpi.changeColor)}>
                  {kpi.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 2. Grelha de Gráfico e Tabela */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Coluna Esquerda: Gráfico de Cashflow (Baseado no "Fynix") */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Fluxo de Caixa (Últimos 7 Meses)</CardTitle>
            <CardDescription>
              Pagamentos recebidos vs. valores em atraso.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  formatter={(value: number) =>
                    `${value.toLocaleString("pt-MZ")} MT`
                  }
                />
                <Legend />
                <Bar
                  dataKey="Pago"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="Atrasado"
                  fill="hsl(var(--destructive))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Coluna Direita: Tabela de Clientes Recentes (Baseado no "Fynix") */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
            <Button asChild variant="link" className="p-0 h-auto -mt-1">
              <Link href="/dashboard/clientes">
                Ver todos <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentClientsData.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="font-medium">{client.nome}</div>
                      <div className="text-xs text-muted-foreground">
                        {client.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          client.status === "ATRASADO"
                            ? "destructive"
                            : client.status === "LIQUIDADO"
                            ? "outline"
                            : "default"
                        }
                        className="capitalize"
                      >
                        {client.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}