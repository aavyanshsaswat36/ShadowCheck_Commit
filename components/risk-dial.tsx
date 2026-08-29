"use client"

import { ShieldAlert, TrendingDown, TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { scoreToLevel, type RiskLevel } from "@/lib/risk-score"

const RISK_CONFIG: Record<
  RiskLevel,
  {
    label: string
    color: string
    glow: string
    arc: string
  }
> = {
  low: { label: "Low", color: "text-neon-green", glow: "var(--neon-green)", arc: "stroke-neon-green" },
  moderate: { label: "Moderate", color: "text-neon-amber", glow: "var(--neon-amber)", arc: "stroke-neon-amber" },
  elevated: { label: "Elevated", color: "text-neon-amber", glow: "var(--neon-amber)", arc: "stroke-neon-amber" },
  high: { label: "High", color: "text-orange-400", glow: "#fb923c", arc: "stroke-orange-400" },
  critical: { label: "Critical", color: "text-neon-red", glow: "var(--neon-red)", arc: "stroke-neon-red" },
}

export function RiskDial({
  score = 0,
  trend,
}: {
  score?: number
  trend?: { direction: "up" | "down" | "neutral"; label: string }
}) {
  const level = scoreToLevel(score)
  const cfg = RISK_CONFIG[level]
  const radius = 80
  const circumference = Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <Card className="relative overflow-hidden border-border/60 bg-card/60 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Risk Score
          </CardTitle>
          <ShieldAlert className={`h-5 w-5 ${cfg.color}`} aria-hidden="true" />
        </div>
        <CardDescription className="sr-only">
          Overall exposure risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="relative flex flex-col items-center pt-2">
        <div className="relative h-[120px] w-[200px]">
          <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
            <path
              d="M 20 110 A 80 80 0 0 1 180 110"
              fill="none"
              strokeWidth="10"
              className="stroke-border"
            />
            <path
              d="M 20 110 A 80 80 0 0 1 180 110"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className={`${cfg.arc} drop-shadow-[0_0_6px_${cfg.glow}]`}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
            <line
              x1="100"
              y1="110"
              x2="100"
              y2="38"
              className={cfg.arc}
              strokeWidth="2"
              style={{
                transform: `rotate(${(score / 100) * 180 - 90}deg)`,
                transformOrigin: "100px 110px",
                transition: "transform 1s ease-out",
              }}
            />
            <circle cx="100" cy="110" r="6" className="fill-border" />
            <circle cx="100" cy="110" r="3" className={cfg.arc} />
          </svg>
          <div className="absolute inset-x-0 bottom-2 flex flex-col items-center">
            <span className={`font-display text-4xl font-bold ${cfg.color}`}>
              {score}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              / 100
            </span>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`mt-3 border-current/40 bg-current/10 ${cfg.color}`}
        >
          {cfg.label} Risk
        </Badge>
        {trend && (
          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            {trend.direction === "up" && (
              <TrendingUp className="h-3.5 w-3.5 text-neon-red" aria-hidden="true" />
            )}
            {trend.direction === "down" && (
              <TrendingDown className="h-3.5 w-3.5 text-neon-green" aria-hidden="true" />
            )}
            <span>{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
