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
import {
  ArrowRight,
  Banknote,
  Users,
  Landmark,
  FileWarning,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();

  // Dados fallback caso não tenha chegado do backend
  const kpiData = data?.kpis ?? [
    { title: "Total Emprestado", value: data?.totalEmprestado +"MT" || 0 + "MT", change: data?.totalEmprestimos +"de clientes" || 0 + "de clientes", icon: Landmark, changeColor: "text-green-600" },
    { title: "Clientes Ativos", value: data?.totalClientesAtivos || 0, change: "0", icon: Users, changeColor: "text-green-600" },
    { title: "Total Juros (Mês)", value: "0 MT", change: "0%", icon: Banknote, changeColor: "text-green-600" },
    { title: "Empréstimos Atrasados", value: "0", change: "0", icon: FileWarning, changeColor: "text-red-600" },
  ];

  const chartData = data?.cashflow ?? [
    { month: "Jan", Pago: 0, Atrasado: 0 },
    { month: "Fev", Pago: 0, Atrasado: 0 },
    { month: "Mar", Pago: 0, Atrasado: 0 },
    { month: "Abr", Pago: 0, Atrasado: 0 },
    { month: "Mai", Pago: 0, Atrasado: 0 },
    { month: "Jun", Pago: 0, Atrasado: 0 },
    { month: "Jul", Pago: 0, Atrasado: 0 },
  ];

  const recentClientsData = data?.clientesRecentes ?? [
    { id: "0", nome: "Nenhum", status: "LIQUIDADO", email: "-", totalEmprestado: 0 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Dashboard da Empresa
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{kpi.value}</div>
                <p className={cn("text-xs", kpi.changeColor)}>{kpi.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráfico + Tabela */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Gráfico */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Fluxo de Caixa (Últimos 7 Meses)</CardTitle>
            <CardDescription>Pagamentos recebidos vs. valores em atraso.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`}/>
                <Tooltip cursor={{ fill: "transparent" }} formatter={(value: number) => `${value} MT`}/>
                <Legend />
                <Bar dataKey="Pago" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Atrasado" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabela de Clientes */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Clientes Recentes</CardTitle>
            <Button asChild variant="link" className="p-0 h-auto -mt-1">
              <Link href="/dashboard/clientes">Ver todos <ArrowRight className="h-4 w-4 ml-1" /></Link>
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
                      <div className="text-xs text-muted-foreground">{client.email}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          client.status === "ATRASADO" ? "destructive" :
                          client.status === "LIQUIDADO" ? "outline" : "default"
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
