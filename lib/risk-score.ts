type BreachRecord = {
  breachDate?: string
  dataClasses?: string[]
}

const DATA_SEVERITY: Record<string, number> = {
  "email addresses": 0.2,
  usernames: 0.2,
  "ip addresses": 0.25,
  "ip address": 0.25,
  names: 0.4,
  "date of birth": 0.4,
  "date of birth(s)": 0.4,
  "phone numbers": 0.45,
  "phone number": 0.45,
  "physical addresses": 0.5,
  "security questions": 0.65,
  "password hints": 0.65,
  passwords: 0.9,
  password: 0.9,
  "payment information": 0.9,
  "credit card": 0.9,
  "financial information": 0.9,
  "government issued ids": 1.0,
  "government id": 1.0,
  "government identifiers": 1.0,
}

const CREDENTIAL_CLASSES = new Set([
  "passwords",
  "password",
  "password hints",
  "security questions",
])

const FINANCIAL_CLASSES = new Set([
  "payment information",
  "credit card",
  "financial information",
])

const normalize = (value: string): string => value.trim().toLowerCase()

function getSeverity(dataClasses: string[]): number {
  return 1 - dataClasses.reduce((product, dataClass) => {
    const severity = DATA_SEVERITY[normalize(dataClass)] ?? 0.15
    return product * (1 - severity)
  }, 1)
}

function getRecencyMultiplier(breachDate?: string): number {
  if (!breachDate) return 0.35
  const breachTime = new Date(breachDate).getTime()
  if (Number.isNaN(breachTime)) return 0.35
  const yearsSinceBreach =
    Math.max(0, Date.now() - breachTime) / (365.25 * 24 * 60 * 60 * 1000)
  return 0.35 + 0.65 * Math.exp(-0.2 * yearsSinceBreach)
}

function getAccountDataMultiplier(dataClasses: string[]): number {
  const normalized = Array.from(new Set(dataClasses.map(normalize)))
  if (normalized.some((item) => FINANCIAL_CLASSES.has(item))) return 1.0
  if (normalized.some((item) => ["passwords", "password"].includes(item)))
    return 1.0
  if (
    normalized.some((item) =>
      ["password hashes", "password hash"].includes(item)
    )
  )
    return 0.85
  if (
    normalized.some((item) =>
      ["account information", "account details"].includes(item)
    )
  )
    return 0.75
  if (normalized.includes("email addresses") && normalized.length <= 2) return 0.5
  return 0.65
}

export function calculateRiskScore(
  breaches: BreachRecord[] | { breaches?: BreachRecord[] }
): number {
  const breachList = Array.isArray(breaches)
    ? breaches
    : breaches?.breaches ?? []

  if (breachList.length === 0) return 0

  const normalizedBreaches = breachList.map((breach) => ({
    ...breach,
    dataClasses: (breach.dataClasses ?? []).map(normalize),
  }))

  const breachRisks = normalizedBreaches.map((breach) => {
    const severity = getSeverity(breach.dataClasses)
    const recency = getRecencyMultiplier(breach.breachDate)
    const accountData = getAccountDataMultiplier(breach.dataClasses)
    return severity * recency * accountData
  })

  const baseRisk =
    100 *
    (1 -
      breachRisks.reduce((product, risk) => product * (1 - risk), 1))

  const passwordBreaches = normalizedBreaches.filter((breach) =>
    breach.dataClasses.some((dataClass) =>
      ["passwords", "password"].includes(dataClass)
    )
  ).length

  let credentialPenalty = 0
  if (passwordBreaches >= 3) credentialPenalty = 45
  else if (passwordBreaches === 2) credentialPenalty = 30
  else if (passwordBreaches === 1) credentialPenalty = 15

  const exposedClasses = Array.from(
    new Set(normalizedBreaches.flatMap((breach) => breach.dataClasses))
  )

  let combinationBonus = 0
  const hasEmail = exposedClasses.includes("email addresses")
  const hasPassword = exposedClasses.some((item) =>
    ["passwords", "password"].includes(item)
  )
  const hasPhone = exposedClasses.some((item) =>
    ["phone numbers", "phone number"].includes(item)
  )
  const hasAddress = exposedClasses.some((item) =>
    ["physical addresses", "physical address"].includes(item)
  )
  const hasSecurity = exposedClasses.some(
    (item) => CREDENTIAL_CLASSES.has(item) && item === "security questions"
  )
  const hasFinancial = exposedClasses.some((item) =>
    FINANCIAL_CLASSES.has(item)
  )

  if (hasEmail && hasPassword) combinationBonus += 10
  if (hasPassword && hasPhone) combinationBonus += 8
  if (hasPassword && hasAddress) combinationBonus += 8
  if (hasPassword && hasSecurity) combinationBonus += 15
  if (hasPassword && hasFinancial) combinationBonus += 20
  combinationBonus = Math.min(25, combinationBonus)

  return Math.min(
    100,
    Math.max(0, Math.round(baseRisk + credentialPenalty + combinationBonus))
  )
}

export type RiskLevel = "low" | "moderate" | "elevated" | "high" | "critical"

export function scoreToLevel(score: number): RiskLevel {
  if (score >= 85) return "critical"
  if (score >= 70) return "high"
  if (score >= 50) return "elevated"
  if (score >= 30) return "moderate"
  return "low"
}
