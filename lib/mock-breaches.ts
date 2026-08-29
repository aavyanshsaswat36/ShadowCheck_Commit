export type BreachRecord = {
  Name: string
  Domain: string
  BreachDate: string
  DataClasses: string[]
  Description: string
}

export const MOCK_BREACHES: BreachRecord[] = [
  {
    Name: "Canva",
    Domain: "canva.com",
    BreachDate: "2019-05-24",
    DataClasses: [
      "Email addresses",
      "Names",
      "Usernames",
      "Passwords",
      "IP addresses",
    ],
    Description:
      "A large account database was exposed containing user profile information, login credentials, and network metadata.",
  },
  {
    Name: "OldForum",
    Domain: "oldforum.example",
    BreachDate: "2015-08-17",
    DataClasses: ["Email addresses"],
    Description:
      "An archived forum database was exposed with email addresses from registered members.",
  },
  {
    Name: "ShopSphere",
    Domain: "shopsphere.example",
    BreachDate: "2026-04-12",
    DataClasses: [
      "Email addresses",
      "Passwords",
      "Phone numbers",
      "Physical addresses",
      "Payment information",
    ],
    Description:
      "A recent e-commerce breach exposed customer contact details, plaintext passwords, shipping addresses, and payment-related information.",
  },
  {
    Name: "GameVault",
    Domain: "gamevault.example",
    BreachDate: "2026-06-03",
    DataClasses: [
      "Email addresses",
      "Passwords",
      "Security questions",
      "IP addresses",
    ],
    Description:
      "A gaming service breach exposed account emails, plaintext passwords, security questions, and IP addresses.",
  },
  {
    Name: "MailList",
    Domain: "maillist.example",
    BreachDate: "2026-02-21",
    DataClasses: ["Email addresses", "Names"],
    Description:
      "A marketing database leak exposed subscriber email addresses and names without account credentials.",
  },
]
