"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function Sidebar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [userName, setUserName] = useState("Usuário");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const nameMatch = document.cookie.match(/userName=([^;]+)/);
    if (nameMatch) setUserName(decodeURIComponent(nameMatch[1]));

    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setCollapsed(saved === "true");

    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setCollapsed(true);
        setMobileOpen(false);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function expandSidebar() {
    if (collapsed) {
      setCollapsed(false);
      localStorage.setItem("sidebarCollapsed", "false");
    }
  }

  function toggleSidebar() {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      const value = !collapsed;
      setCollapsed(value);
      localStorage.setItem("sidebarCollapsed", String(value));
    }
  }

  function handleMenuClick() {
    if (isMobile) setMobileOpen(false);
    expandSidebar();
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function logout() {
    document.cookie = "auth=; Max-Age=0; path=/";
    document.cookie = "userName=; Max-Age=0; path=/";
    router.push("/login");
  }

  if (!mounted) return null;

  return (
    <>
      {/* BOTÃO MOBILE */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background border shadow"
        >
          ☰
        </button>
      )}

      {/* OVERLAY MOBILE */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50
          ${collapsed ? "w-16" : "w-64"}
          ${isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0"}
          transition-all duration-300
          min-h-screen bg-background border-r
          flex flex-col justify-between
        `}
      >
        {/* TOPO */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <img
                  src="/icons/igreja-icon.png"
                  alt="Portal Ekklesia"
                  className="h-7 w-7"
                />
                <span className="font-bold text-primary">Portal Ekklesia</span>
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted transition"
            >
              {/* MOBILE */}
              {isMobile && <span className="text-lg">✖</span>}

              {/* DESKTOP */}
              {!isMobile && (
                <>
                  {/* recolher (←) */}
                  {!collapsed && (
                    <>
                      <img
                        src="/icons/Back-24-light.png"
                        alt="Recolher menu"
                        className="block dark:hidden w-4 h-4"
                      />
                      <img
                        src="/icons/Back-24-dark.png"
                        alt="Recolher menu"
                        className="hidden dark:block w-4 h-4"
                      />
                    </>
                  )}

                  {/* expandir (→) */}
                  {collapsed && (
                    <>
                      <img
                        src="/icons/forward-24-light.png"
                        alt="Expandir menu"
                        className="block dark:hidden w-4 h-4"
                      />
                      <img
                        src="/icons/forward-24-dark.png"
                        alt="Expandir menu"
                        className="hidden dark:block w-4 h-4"
                      />
                    </>
                  )}
                </>
              )}
            </button>
          </div>

          {!collapsed && (
            <div className="px-4 py-4">
              <p className="text-xs text-muted-foreground">Bem-vindo,</p>
              <p className="font-semibold">{userName}</p>
            </div>
          )}

          <nav className="px-2 space-y-1">
            <MenuItem
              href="dashboard"
              label="Dashboard"
              collapsed={collapsed}
              onClick={handleMenuClick}
              icon={
                <>
                  {/* modo claro */}
                  <img
                    src="/icons/Dash-24-light.png"
                    alt="Dashboard"
                    className="block dark:hidden w-5 h-5"
                  />

                  {/* modo escuro */}
                  <img
                    src="/icons/Dash-24-dark.png"
                    alt="Dashboard"
                    className="hidden dark:block w-5 h-5"
                  />
                </>
              }
            />

            <MenuItem
              href="membros"
              label="Membros"
              collapsed={collapsed}
              onClick={handleMenuClick}
              icon={
                <>
                  {/* modo claro */}
                  <img
                    src="/icons/members-24-light.png"
                    alt="Dashboard"
                    className="block dark:hidden w-5 h-5"
                  />

                  {/* modo escuro */}
                  <img
                    src="/icons/members-24-dark.png"
                    alt="Dashboard"
                    className="hidden dark:block w-5 h-5"
                  />
                </>
              }
            />

            <MenuItem
              href="configuracoes"
              label="Configurações"
              collapsed={collapsed}
              onClick={handleMenuClick}
              icon={
                <>
                  {/* modo claro */}
                  <img
                    src="/icons/config-24-light.png"
                    alt="Dashboard"
                    className="block dark:hidden w-5 h-5"
                  />

                  {/* modo escuro */}
                  <img
                    src="/icons/config-24-dark.png"
                    alt="Dashboard"
                    className="hidden dark:block w-5 h-5"
                  />
                </>
              }
            />
          </nav>
        </div>

        {/* RODAPÉ */}
        <div className="p-2 border-t space-y-2">
          <Button
            variant="outline"
            className={`w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
            onClick={toggleTheme}
          >
            {collapsed ? "🌗" : theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
          </Button>

          <Button
            variant="destructive"
            className={`w-full ${
              collapsed ? "justify-center" : "justify-start"
            }`}
            onClick={logout}
          >
            {collapsed ? "🚪" : "Sair"}
          </Button>
        </div>
      </aside>
    </>
  );
}

function MenuItem({
  href,
  icon,
  label,
  collapsed,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onClick: () => void;
}) {
 return (
  <Link
    href={href}
    onClick={onClick}
    className={`
      group relative
      flex items-center gap-3 rounded-md px-3 py-2 text-sm
      hover:bg-muted transition-all duration-200
      ${collapsed ? "justify-center" : ""}
    `}
  >
    {/* Ícone */}
    <span className="w-6 h-6 flex items-center justify-center">
      {icon}
    </span>

    {/* Texto normal quando aberto */}
    {!collapsed && <span>{label}</span>}

    {/* Tooltip quando fechado */}
    {collapsed && (
      <span
        className="
          absolute left-14
          whitespace-nowrap
          rounded-md bg-black text-white
          px-2 py-1 text-xs
          opacity-0 group-hover:opacity-100
          translate-x-[-4px] group-hover:translate-x-0
          transition-all duration-200
          pointer-events-none
        "
      >
        {label}
      </span>
    )}
  </Link>
);
}
