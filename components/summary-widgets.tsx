"use client"

import {
  Database,
  Fingerprint,
  Globe,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AuditResult } from "@/lib/audit"

type WidgetDatum = {
  id: string
  label: string
  icon: React.ElementType
  accent: string
  glow: string
  getValue: (r: AuditResult) => string
  getSub: (r: AuditResult) => string
  getTrend: (r: AuditResult) => { direction: "up" | "down" | "neutral"; value: string }
}

const WIDGETS: WidgetDatum[] = [
  {
    id: "breaches",
    label: "Known Breaches",
    icon: Database,
    accent: "text-neon-red",
    glow: "var(--neon-red)",
    getValue: (r) => String(r.breaches.length),
    getSub: (r) => `across ${new Set(r.breaches.map((b) => b.Domain)).size} sources`,
    getTrend: (r) => ({ direction: r.breaches.length > 3 ? "up" : "neutral", value: `${r.breaches.length} found` }),
  },
  {
    id: "exposed",
    label: "Exposed Records",
    icon: Fingerprint,
    accent: "text-neon-amber",
    glow: "var(--neon-amber)",
    getValue: (r) => r.totalRecords,
    getSub: () => "records found",
    getTrend: () => ({ direction: "up", value: "live" }),
  },
  {
    id: "leaks",
    label: "Data Types",
    icon: Globe,
    accent: "text-neon-cyan",
    glow: "var(--neon-cyan)",
    getValue: (r) => String(r.exposedDataTypes.length),
    getSub: () => "unique categories",
    getTrend: (r) => ({ direction: r.exposedDataTypes.length > 4 ? "up" : "neutral", value: `${r.exposedDataTypes.length} types` }),
  },
  {
    id: "secured",
    label: "Credential Loss",
    icon: Lock,
    accent: "text-neon-green",
    glow: "var(--neon-green)",
    getValue: (r) => `${r.passwordBreaches}`,
    getSub: () => "password breaches",
    getTrend: (r) => ({ direction: r.passwordBreaches > 0 ? "up" : "neutral", value: r.passwordBreaches > 0 ? "at risk" : "safe" }),
  },
]

export function SummaryWidgets({ result }: { result: AuditResult | null }) {
  const data = WIDGETS

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {data.map((w, i) => {
        const value = result ? w.getValue(result) : "—"
        const sub = result ? w.getSub(result) : "awaiting scan"
        const trend = result ? w.getTrend(result) : { direction: "neutral" as const, value: "—" }

        return (
          <Card
            key={w.id}
            className={cn(
              "group relative overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-current/30",
              "animate-fade-in-up"
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at top right, hsl(var(--neon-cyan) / 0.06), transparent 60%)`,
              }}
            />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {w.label}
              </CardTitle>
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border border-current/20 bg-current/10",
                  w.accent
                )}
              >
                <w.icon className="h-4 w-4" aria-hidden="true" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    {value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    trend.direction === "up" && "text-neon-red",
                    trend.direction === "down" && "text-neon-green",
                    trend.direction === "neutral" && "text-muted-foreground"
                  )}
                >
                  {trend.direction === "up" && <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />}
                  {trend.direction === "down" && <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />}
                  {trend.direction === "neutral" && <Minus className="h-3.5 w-3.5" aria-hidden="true" />}
                  {trend.value}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
