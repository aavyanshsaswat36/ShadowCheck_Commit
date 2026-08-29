ShadowCheck-
A zero-retention, client-side focused OSINT intelligence dashboard built with Next.js, TypeScript, and Tailwind CSS. Designed for real-time digital footprint auditing and risk scoring. ShadowCheck operates like a digital background check for everyday internet users. When someone types their email address into the search bar, the website scans global databases of known hacker leaks (like the 2013 Yahoo breach or recent LinkedIn leaks). 


Features
1. Zero-Retention Architecture: The website has a "zero retention" base. It holds the email just long enough to run the search, displays the results on the screen, and the moment the user closes the window, it forgets they were ever there. This leaves no persistent trail on backend servers.

2. Custom Risk-Scoring Algorithm: Instead of just dumping a massive wall of hacker data on a user, our site calculates a simple grade. If an email was in a breach 10 years ago and only a username was exposed, the score might be a 15 (Low Risk). If a breach happened last month and included plaintext passwords and a phone number, the score spikes to 95 (Critical Danger).Real-time threat evaluation computing weighted risk levels based on simulated digital exposure metrics.

3. Interactive Threat Dial & Leak Tables: The website has dynamic UI components visualizing exposure intensity with categorical data mapping.

4. Demo Switch Controls: Hardcoded evaluation overrides for rapid hackathon demonstration and predictable scoring states.

**Right now, the entire pipeline runs client-side against a controlled dataset i.e. no server call actually happens. The API layer for a real OSINT source like HaveIBeenPwned is our next milestone. Type safe@demo.com or safe@demo2.com or safe@dem.com to see the different risk tiers.(sample test cases)**

Tech Stack
1.Framework: Next.js (App Router)
2.Language: TypeScript
3.Styling: Tailwind CSS
4.Deployment: Vercel
