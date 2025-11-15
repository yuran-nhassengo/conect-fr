import React from "react";

// Este layout 'em branco' permite que a página de login
// controle todo o layout, o que é necessário para o design de ecrã dividido.
// Ele não adiciona 'padding' ou 'centragem'.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}