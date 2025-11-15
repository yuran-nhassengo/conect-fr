"use client";

import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
// 1. Importar o TIPO de ícone
import { LucideIcon } from "lucide-react";

// 2. Definir o TIPO de um link
export type NavLink = {
  title: string;
  href: string;
  icon: LucideIcon;
};

// 3. Definir as PROPS do componente
// O componente agora espera uma lista de links
type DashboardNavProps = {
  isCollapsed: boolean;
  links: NavLink[];
};

// 4. Este componente agora apenas RENDERIZA os links que recebe
export function DashboardNav({ isCollapsed, links }: DashboardNavProps) {
  return (
    <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {links.map((link, index) =>
        isCollapsed ? (
          // Tooltip para o menu colapsado (só ícones)
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{link.title}</TooltipContent>
          </Tooltip>
        ) : (
          // Links normais (ícone e texto)
          <Link
            key={index}
            href={link.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <link.icon className="h-4 w-4" />
            {link.title}
          </Link>
        )
      )}
    </nav>
  );
}