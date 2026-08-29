"use client"

import { useState } from "react"
import { Activity, Cpu, Signal, Search as SearchIcon } from "lucide-react"

import { TopNav } from "@/components/top-nav"
import { BreachSearch } from "@/components/breach-search"
import { RiskDial } from "@/components/risk-dial"
import { SummaryWidgets } from "@/components/summary-widgets"
import { BreachTable } from "@/components/breach-table"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import type { AuditResult } from "@/lib/audit"

export default function Home() {
  const [result, setResult] = useState<AuditResult | null>(null)

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <TopNav />

      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-[0.15]" />
        <div className="pointer-events-none fixed inset-0 bg-radial-fade" />

        <section className="relative animate-fade-in-up">
          <div className="mb-6 flex flex-col items-center gap-1 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-xs font-medium text-neon-cyan">
              <Signal className="h-3 w-3 animate-pulse" aria-hidden="true" />
              Real-time OSINT scanning engine online
            </span>
          </div>
          <BreachSearch onAudit={setResult} />
        </section>

        {result && (
          <section className="relative mt-8 animate-fade-in-up">
            <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2.5">
              <SearchIcon className="h-4 w-4 text-neon-cyan" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                Audit results for{" "}
                <span className="font-mono font-medium text-foreground">
                  {result.email}
                </span>
              </span>
              {result.demoMode && (
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-neon-amber/40 bg-neon-amber/10 px-2.5 py-0.5 text-xs font-medium text-neon-amber">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-neon-amber" />
                  {result.demoMode}
                </span>
              )}
            </div>
          </section>
        )}

        <section className="relative mt-8">
          <SectionHeading
            icon={Activity}
            title="Exposure Overview"
            subtitle="Aggregated metrics across monitored identities"
          />
          <div className="mt-4">
            <SummaryWidgets result={result} />
          </div>
        </section>

        <section className="relative mt-8 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <RiskDial
              score={result?.riskScore ?? 0}
              trend={
                result
                  ? {
                      direction: result.riskScore > 50 ? "up" : "down",
                      label:
                        result.riskScore > 50
                          ? "High exposure detected"
                          : "Low exposure profile",
                    }
                  : undefined
              }
            />
          </div>
          <div className="lg:col-span-2">
            <SystemStatus />
          </div>
        </section>

        <section className="relative mt-8">
          <SectionHeading
            icon={Cpu}
            title="Detailed Findings"
            subtitle="Chronological log of discovered data exposures"
          />
          <div className="mt-4">
            <BreachTable breaches={result?.breaches ?? []} />
          </div>
        </section>

        <footer className="relative mt-16 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          <p>
            ShadowCheck Threat Intelligence Platform &middot; Data refreshed
            every 15 minutes &middot; For authorized security use only
          </p>
        </footer>
      </main>
    </div>
  )
}

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon-cyan/30 bg-neon-cyan/5">
        <Icon className="h-4.5 w-4.5 text-neon-cyan" aria-hidden="true" />
      </div>
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

function SystemStatus() {
  const services = [
    { name: "Breach Database Sync", status: "operational", latency: "42ms" },
    { name: "Dark Web Monitor", status: "operational", latency: "128ms" },
    { name: "Credential Scanner", status: "degraded", latency: "1.2s" },
    { name: "Domain Watch", status: "operational", latency: "67ms" },
  ]

  return (
    <Card className="relative h-full overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <CardHeader className="relative">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          System Status
        </CardTitle>
        <CardDescription className="sr-only">
          Operational health of scanning services
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-2">
        {services.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 px-3 py-2.5 transition-colors hover:border-neon-cyan/30"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  s.status === "operational"
                    ? "animate-pulse-glow bg-neon-green shadow-[0_0_8px_var(--neon-green)]"
                    : "animate-pulse-glow bg-neon-amber shadow-[0_0_8px_var(--neon-amber)]"
                }`}
              />
              <span className="text-sm font-medium text-foreground">
                {s.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground">
                {s.latency}
              </span>
              <span
                className={`text-xs font-medium uppercase tracking-wider ${
                  s.status === "operational"
                    ? "text-neon-green"
                    : "text-neon-amber"
                }`}
              >
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
