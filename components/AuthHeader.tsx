// components/AuthHeader.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";

interface AuthHeaderProps {
  page: "login" | "register";
}

export default function AuthHeader({ page }: AuthHeaderProps) {
  return (
     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
       <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-primary"
        >
          <Landmark className="h-6 w-6" />
          <span>Conecta-Crédito</span>
        </Link>
       
        <nav className="hidden items-center gap-4 md:flex">
             <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Início
          </Link>
          <div className="text-blue-950">{page === "login" ? "Login" : "Cadastro"}</div>
        </nav>
        
      </div>
     
    </header>
  );
}
