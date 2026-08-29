"use client"

import { ExternalLink, ShieldX, Eye, Calendar, Hash, Inbox } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BreachRecord } from "@/lib/mock-breaches"

type Severity = "critical" | "high" | "medium" | "low"

function classifyBreach(b: BreachRecord): Severity {
  const classes = b.DataClasses.map((c) => c.trim().toLowerCase())
  if (classes.some((c) => ["payment information", "credit card", "government id", "government issued ids"].includes(c)))
    return "critical"
  if (classes.some((c) => ["passwords", "password", "security questions"].includes(c)))
    return "high"
  if (classes.length >= 3) return "medium"
  return "low"
}

const SEVERITY_STYLES: Record<Severity, { className: string; dot: string }> = {
  critical: {
    className: "border-neon-red/40 bg-neon-red/10 text-neon-red",
    dot: "bg-neon-red shadow-[0_0_6px_var(--neon-red)]",
  },
  high: {
    className: "border-orange-400/40 bg-orange-400/10 text-orange-400",
    dot: "bg-orange-400",
  },
  medium: {
    className: "border-neon-amber/40 bg-neon-amber/10 text-neon-amber",
    dot: "bg-neon-amber",
  },
  low: {
    className: "border-neon-green/40 bg-neon-green/10 text-neon-green",
    dot: "bg-neon-green",
  },
}

export function BreachTable({ breaches }: { breaches: BreachRecord[] }) {
  return (
    <Card className="relative overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <CardHeader className="relative flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShieldX className="h-5 w-5 text-neon-red" aria-hidden="true" />
            Breach History
          </CardTitle>
          <CardDescription className="mt-1">
            Data exposures linked to this identity
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Export Report
        </Button>
      </CardHeader>
      <CardContent className="relative p-0">
        {breaches.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-neon-green/30 bg-neon-green/10">
              <Inbox className="h-6 w-6 text-neon-green" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">No breaches found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Run an audit to see exposure history
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="pl-6">Source</TableHead>
                  <TableHead>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      Date
                    </span>
                  </TableHead>
                  <TableHead>
                    <span className="inline-flex items-center gap-1.5">
                      <Hash className="h-3.5 w-3.5" aria-hidden="true" />
                      Domain
                    </span>
                  </TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="pr-6">Data Types</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breaches.map((b, idx) => {
                  const sev = SEVERITY_STYLES[classifyBreach(b)]
                  return (
                    <TableRow
                      key={`${b.Name}-${idx}`}
                      className="group border-border/40 transition-colors hover:bg-neon-cyan/5"
                    >
                      <TableCell className="pl-6 py-3.5 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{b.Name}</span>
                          <ExternalLink
                            className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="py-3.5 text-muted-foreground">
                        {b.BreachDate}
                      </TableCell>
                      <TableCell className="py-3.5 font-mono text-sm text-foreground">
                        {b.Domain}
                      </TableCell>
                      <TableCell className="py-3.5">
                        <Badge variant="outline" className={`gap-1.5 ${sev.className}`}>
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${sev.dot}`} />
                          {classifyBreach(b)}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-6 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {b.DataClasses.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              <Eye className="h-2.5 w-2.5" aria-hidden="true" />
                              {t}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
