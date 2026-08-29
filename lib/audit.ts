import { MOCK_BREACHES, type BreachRecord } from "./mock-breaches"
import { calculateRiskScore, scoreToLevel, type RiskLevel } from "./risk-score"

export type AuditResult = {
  email: string
  breaches: BreachRecord[]
  riskScore: number
  riskLevel: RiskLevel
  totalRecords: string
  exposedDataTypes: string[]
  passwordBreaches: number
  demoMode: string | null
}

const SAFE_LOW = "safe@demo.com"
const SAFE_MEDIUM = "safe@demo2.com"

function selectBreaches(email: string): { breaches: BreachRecord[]; demoMode: string | null } {
  const normalized = email.trim().toLowerCase()

  if (normalized === SAFE_LOW) {
    const oldForum = MOCK_BREACHES.find((b) => b.Name === "OldForum")
    return { breaches: oldForum ? [oldForum] : [], demoMode: "Low-risk demo" }
  }

  if (normalized === SAFE_MEDIUM) {
    const mailList = MOCK_BREACHES.find((b) => b.Name === "MailList")
    return { breaches: mailList ? [mailList] : [], demoMode: "Medium-risk demo" }
  }

  return { breaches: [...MOCK_BREACHES], demoMode: null }
}

function estimateRecords(breaches: BreachRecord[]): string {
  const baseMap: Record<string, number> = {
    Canva: 137000000,
    OldForum: 2400000,
    ShopSphere: 8900000,
    GameVault: 12500000,
    MailList: 5600000,
  }
  const total = breaches.reduce((sum, b) => sum + (baseMap[b.Name] ?? 1000000), 0)
  if (total >= 1_000_000_000) return `${(total / 1_000_000_000).toFixed(1)}B`
  if (total >= 1_000_000) return `${(total / 1_000_000).toFixed(1)}M`
  if (total >= 1_000) return `${(total / 1_000).toFixed(0)}K`
  return `${total}`
}

export function runAudit(email: string): AuditResult {
  const { breaches, demoMode } = selectBreaches(email)
  const riskScore = calculateRiskScore(
    breaches.map((b) => ({
      breachDate: b.BreachDate,
      dataClasses: b.DataClasses,
    }))
  )
  const riskLevel = scoreToLevel(riskScore)
  const exposedDataTypes = Array.from(
    new Set(breaches.flatMap((b) => b.DataClasses))
  )
  const passwordBreaches = breaches.filter((b) =>
    b.DataClasses.some((dc) =>
      ["passwords", "password"].includes(dc.trim().toLowerCase())
    )
  ).length

  return {
    email,
    breaches,
    riskScore,
    riskLevel,
    totalRecords: estimateRecords(breaches),
    exposedDataTypes,
    passwordBreaches,
    demoMode,
  }
}
