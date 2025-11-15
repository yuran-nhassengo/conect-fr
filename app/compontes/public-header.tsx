"use client";

import Link from "next/link";

import { Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PublicHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        {/* Logotipo e Nome */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-primary"
        >
          <Landmark className="h-6 w-6" />
          <span>Conecta-Crédito</span>
        </Link>

        {/* Links de Navegação */}
        <nav className="hidden items-center gap-4 md:flex">
          <Link
            href="#inicio"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Início
          </Link>
          <Link
            href="#sobre"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Sobre Nós
          </Link>
          <Link
            href="#funcionalidades"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Funcionalidades
          </Link>
          <Link
            href="#precos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Preços
          </Link>
        </nav>

        {/* Botão de Login */}
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
};