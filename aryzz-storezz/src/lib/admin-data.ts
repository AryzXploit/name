export type AccountStatus = "active" | "banned" | "pending";

export type UserAccount = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Security Admin" | "Operator" | "Finance" | "Marketing";
  status: AccountStatus;
  createdAt: string;
  lastActive: string;
  referralCode: string;
  referralsCount: number;
  riskScore: number;
};

export type ReferralCampaign = {
  id: string;
  name: string;
  code: string;
  reward: string;
  conversions: number;
  status: "running" | "paused" | "scheduled";
};

export const initialUsers: UserAccount[] = [
  {
    id: "USR-001",
    name: "Fara Humaira",
    email: "fara.humaira@aryzz-storezz.com",
    role: "Owner",
    status: "active",
    createdAt: "2024-02-03T12:20:00.000Z",
    lastActive: "2025-11-07T06:42:00.000Z",
    referralCode: "ARYZZ-CORE",
    referralsCount: 58,
    riskScore: 3,
  },
  {
    id: "USR-002",
    name: "Hadi Prakoso",
    email: "hadi.prakoso@aryzz-storezz.com",
    role: "Security Admin",
    status: "active",
    createdAt: "2024-08-14T09:15:00.000Z",
    lastActive: "2025-11-08T02:18:00.000Z",
    referralCode: "ARYZZ-SHIELD",
    referralsCount: 35,
    riskScore: 7,
  },
  {
    id: "USR-003",
    name: "Sela Armand",
    email: "sela.armand@aryzz-storezz.com",
    role: "Operator",
    status: "banned",
    createdAt: "2025-01-12T15:35:00.000Z",
    lastActive: "2025-10-21T11:05:00.000Z",
    referralCode: "ARYZZ-OPS",
    referralsCount: 4,
    riskScore: 76,
  },
  {
    id: "USR-004",
    name: "Dimas Wicaksono",
    email: "dimas.wicaksono@aryzz-storezz.com",
    role: "Finance",
    status: "active",
    createdAt: "2024-12-05T11:05:00.000Z",
    lastActive: "2025-11-07T21:14:00.000Z",
    referralCode: "ARYZZ-FIN",
    referralsCount: 18,
    riskScore: 12,
  },
  {
    id: "USR-005",
    name: "Clara Widjaja",
    email: "clara.widjaja@aryzz-storezz.com",
    role: "Marketing",
    status: "active",
    createdAt: "2025-03-25T08:55:00.000Z",
    lastActive: "2025-11-08T03:35:00.000Z",
    referralCode: "ARYZZ-GROWTH",
    referralsCount: 92,
    riskScore: 9,
  },
];

export const initialCampaigns: ReferralCampaign[] = [
  {
    id: "CMP-401",
    name: "Trusted Partners Q4",
    code: "TP-Q4-25",
    reward: "2.75% revenue share",
    conversions: 146,
    status: "running",
  },
  {
    id: "CMP-402",
    name: "Healthcare Alliance",
    code: "MED-ALLY",
    reward: "$650 secure onboarding credit",
    conversions: 64,
    status: "scheduled",
  },
  {
    id: "CMP-403",
    name: "Fintech Network",
    code: "FINTRUST-25",
    reward: "$450 growth stipend",
    conversions: 204,
    status: "paused",
  },
];
