import type { ReferralCampaign, UserAccount } from "@/lib/admin-data";

export type AdminState = {
  users: UserAccount[];
  campaigns: ReferralCampaign[];
};

export type AdminAction =
  | { type: "CREATE_USER"; payload: UserAccount }
  | { type: "BAN_USER"; payload: { id: string } }
  | { type: "UNBAN_USER"; payload: { id: string } }
  | { type: "INCREMENT_REFERRAL"; payload: { id: string; delta?: number } }
  | { type: "CREATE_CAMPAIGN"; payload: ReferralCampaign };

export const defaultRoles: UserAccount["role"][] = [
  "Owner",
  "Security Admin",
  "Operator",
  "Finance",
  "Marketing",
];

const randomFragment = () => {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID().replace(/-/g, "").slice(0, 4).toUpperCase();
  }
  return Math.random().toString(36).slice(2, 6).toUpperCase();
};

export const generateReferralCode = (name: string) => {
  const base = name.trim().split(" ")[0]?.toUpperCase() || "ARYZZ";
  return `${base}-${randomFragment()}`;
};

export const generateUserId = () => `USR-${randomFragment()}`;

export const generateCampaignId = () => `CMP-${randomFragment()}`;

export const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case "BAN_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, status: "banned", riskScore: 100 }
            : user,
        ),
      };
    case "UNBAN_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, status: "active", riskScore: 10 }
            : user,
        ),
      };
    case "INCREMENT_REFERRAL":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? {
                ...user,
                referralsCount: user.referralsCount + (action.payload.delta ?? 1),
                lastActive: new Date().toISOString(),
              }
            : user,
        ),
      };
    case "CREATE_CAMPAIGN":
      return {
        ...state,
        campaigns: [action.payload, ...state.campaigns],
      };
    default:
      return state;
  }
};

export const computeUserMetrics = (users: UserAccount[]) => {
  const active = users.filter((user) => user.status === "active").length;
  const banned = users.filter((user) => user.status === "banned").length;
  const pending = users.filter((user) => user.status === "pending").length;
  const avgRisk =
    users.reduce((total, user) => total + user.riskScore, 0) / (users.length || 1);
  const totalReferrals = users.reduce(
    (total, user) => total + user.referralsCount,
    0,
  );

  return {
    active,
    banned,
    pending,
    avgRisk,
    totalReferrals,
  };
};

export const deriveLastUpdated = (users: UserAccount[]) => {
  const timestamps = users
    .map((user) => Date.parse(user.lastActive))
    .filter((value) => Number.isFinite(value));
  if (!timestamps.length) {
    return null;
  }
  return new Date(Math.max(...timestamps));
};
