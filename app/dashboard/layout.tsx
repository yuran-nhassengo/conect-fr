"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Landmark,
  PanelLeft,
  Search,
  Settings,
  HelpCircle,
  Users,
  DollarSign,
  Receipt, // Adicionado para Pagamentos
  UserCog, // Adicionado para Utilizadores
} from "lucide-react";
import { DashboardNav, NavLink } from "../compontes/dashboard-nav";
import { UserMenu } from "../compontes/user-menu";

// 1. Importar os componentes do menu E o novo TIPO


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 2. Definir a lista de links principal completa
  const navLinks: NavLink[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Landmark,
    },
    {
      title: "Empresas",
      href: "/dashboard/empresas",
      icon: Users,
    },
    {
      title: "Clientes",
      href: "/dashboard/clientes",
      icon: Users,
    },
    {
      title: "Empréstimos",
      href: "/dashboard/emprestimos",
      icon: DollarSign,
    },
    {
      title: "Pagamentos",
      href: "/dashboard/pagamentos",
      icon: Receipt,
    },
    {
      title: "Utilizadores",
      href: "/dashboard/utilizadores",
      icon: UserCog,
    },
    {
      title: "Perfil",
      href: "/dashboard/utilizadores",
      icon: UserCog,
    },
  ];

  // Links de rodapé da sidebar (já estava correto)
  const footerLinks: NavLink[] = [
    { title: "Definições", href: "/dashboard/settings", icon: Settings },
    { title: "Suporte", href: "/dashboard/support", icon: HelpCircle },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full min-h-screen w-full"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
      >
        {/* --- BARRA LATERAL (Sidebar) para Desktop --- */}
        <ResizablePanel
          defaultSize={20}
          collapsedSize={4}
          collapsible={true}
          minSize={15}
          maxSize={25}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn(
            "min-w-[50px] transition-all duration-300 ease-in-out hidden lg:block",
            isCollapsed ? "min-w-[50px]" : "min-w-[200px]"
          )}
          // 3. Adicionar o data-attribute para o CSS group
          data-collapsed={isCollapsed}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-center px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-bold text-primary"
              >
                <Landmark className="h-6 w-6" />
                {!isCollapsed && <span className="text-lg">Conecta</span>}
              </Link>
            </div>

            {/* Navegação Principal */}
            <div className="flex-1 overflow-auto py-2">
              {/* 4. Passar 'links={navLinks}' */}
              <DashboardNav isCollapsed={isCollapsed} links={navLinks} />
            </div>

            {/* Navegação (Rodapé da Sidebar) */}
            <nav className="mt-auto border-t p-2">
              <DashboardNav isCollapsed={isCollapsed} links={footerLinks} />
            </nav>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden lg:flex" />

        {/* --- ÁREA DE CONTEÚDO PRINCIPAL --- */}
        <ResizablePanel defaultSize={80} className="h-full">
          <Sheet>
            {/* 1. Cabeçalho (Header) */}
            <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
              {/* Botão do Menu Móvel (Escondido em Desktop) */}
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="outline">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>

              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Pesquisar..."
                  className="w-full rounded-lg bg-secondary pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>

              <UserMenu />
            </header>

            {/* 3. O CONTEÚDO DA PÁGINA (page.tsx) É INSERIDO AQUI */}
            <main className="flex-1 p-4 sm:p-6">{children}</main>

            {/* 4. Conteúdo do Menu Móvel (Sidebar Móvel) */}
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-16 items-center justify-center border-b">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 font-bold text-primary"
                >
                  <Landmark className="h-6 w-6" />
                  <span className="text-lg">Conecta-Crédito</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                {/* 5. Passar 'links={navLinks}' */}
                <DashboardNav isCollapsed={false} links={navLinks} />
              </div>
              <nav className="mt-auto border-t p-2">
                <DashboardNav isCollapsed={false} links={footerLinks} />
              </nav>
            </SheetContent>
          </Sheet>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}