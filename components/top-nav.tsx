"use client"

import { ShieldCheck, Bell, Settings, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 shadow-[0_0_20px_-6px_var(--neon-cyan)]">
            <ShieldCheck className="h-5 w-5 text-neon-cyan" aria-hidden="true" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-[0.12em] text-foreground">
              SHADOW<span className="text-neon-cyan">CHECK</span>
            </span>
            <span className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Threat Intelligence
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink label="Dashboard" active />
          <NavLink label="Breaches" />
          <NavLink label="Reports" />
          <NavLink label="Monitoring" />
        </nav>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="hidden border-neon-green/40 bg-neon-green/10 text-neon-green sm:inline-flex"
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
            Live
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4.5 w-4.5" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neon-red shadow-[0_0_8px_var(--neon-red)]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Settings"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-4.5 w-4.5" aria-hidden="true" />
          </Button>
          <button className="ml-1 flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 transition-colors hover:border-neon-cyan/50">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-neon-cyan/30 to-electric-blue/30 text-xs font-bold text-foreground">
              JA
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

function NavLink({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      {active && (
        <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-neon-cyan shadow-[0_0_8px_var(--neon-cyan)]" />
      )}
    </a>
  )
}
