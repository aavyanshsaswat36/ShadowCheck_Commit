"use client"

import type React from "react"
import { useState } from "react"
import { Search, Radar, Loader2 } from "lucide-react"

import { runAudit, type AuditResult } from "@/lib/audit"

export function BreachSearch({
  onAudit,
}: {
  onAudit: (result: AuditResult) => void
}) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || loading) return
    setLoading(true)
    setTimeout(() => {
      const result = runAudit(email.trim())
      onAudit(result)
      setLoading(false)
    }, 900)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="flex items-baseline font-display text-4xl font-bold tracking-[0.12em] text-foreground text-balance sm:text-5xl">
        <span className="text-5xl text-neon-cyan sm:text-6xl">S</span>
        <span>hadow</span>
        <span className="text-5xl text-neon-cyan sm:text-6xl">C</span>
        <span>heck</span>
      </h1>
      <p className="mt-2 mb-8 text-sm font-medium tracking-wide text-muted-foreground">
        OSINT Threat Intelligence &amp; Digital Footprint Audit
      </p>

      <form
        onSubmit={handleSubmit}
        className="group flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-2 backdrop-blur-md transition-all duration-300 focus-within:border-electric-blue/60 focus-within:shadow-[0_0_35px_-6px_var(--electric-blue)]"
      >
        <div className="flex flex-1 items-center gap-3 pl-3">
          <Radar
            className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-focus-within:text-neon-cyan"
            aria-hidden="true"
          />
          <input
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter an email address to audit..."
            aria-label="Email address to audit"
            className="w-full bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:text-base"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex shrink-0 items-center gap-2 rounded-xl bg-neon-cyan px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_25px_-6px_var(--neon-cyan)] transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 sm:text-base"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4" aria-hidden="true" />
          )}
          {loading ? "Scanning" : "Scan"}
        </button>
      </form>
    </div>
  )
}
