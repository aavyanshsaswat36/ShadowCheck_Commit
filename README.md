ShadowCheck is an OSINT security dashboard that audits an individual's exposed digital footprint and delivers actionable privacy recommendations.

Key Features:
- Risk Score: Calculates an intuitive 0-100 vulnerability rating based on breach recency and data severity.
- Leak Breakdown: Highlights exposed data types (passwords, IPs, personal details) per compromised service.
- Remediation Plan: Generates direct links and step-by-step actions to secure or delete breached accounts.

Architecture & Stack:
- Frontend: Next.js/React with Tailwind CSS for a sleek dark-mode user experience.
- API Layer: Asynchronous fetch pipeline querying HaveIBeenPwned & OSINT APIs, parsing JSON breach payloads dynamically with zero user data retention.
