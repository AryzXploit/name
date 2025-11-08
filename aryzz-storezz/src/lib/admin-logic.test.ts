import { describe, expect, it, vi } from "vitest";
import type { ReferralCampaign, UserAccount } from "@/lib/admin-data";
import {
  adminReducer,
  computeUserMetrics,
  defaultRoles,
  deriveLastUpdated,
  generateCampaignId,
  generateReferralCode,
  generateUserId,
  type AdminState,
} from "@/lib/admin-logic";

const baseUser: UserAccount = {
  id: "USR-BASE",
  name: "Base User",
  email: "base@aryzz-storezz.com",
  role: defaultRoles[0],
  status: "active",
  createdAt: "2024-01-01T00:00:00.000Z",
  lastActive: "2025-11-01T12:00:00.000Z",
  referralCode: "BASE-0001",
  referralsCount: 2,
  riskScore: 15,
};

const baseCampaign: ReferralCampaign = {
  id: "CMP-BASE",
  name: "Baseline Campaign",
  code: "BASE-CODE",
  reward: "Test credit",
  conversions: 5,
  status: "running",
};

describe("admin-logic helpers", () => {
  it("derives referral codes from the first name in uppercase", () => {
    const spy = vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue(
      "abc12345-def6-7890-ghij-klmnopqrstuv",
    );
    const code = generateReferralCode("Fara Humaira");
    expect(code).toBe("FARA-ABC1");
    spy.mockRestore();
  });

  it("creates user and campaign identifiers using cryptographic randomness", () => {
    const spy = vi.spyOn(globalThis.crypto, "randomUUID").mockReturnValue(
      "ff001122-3344-5566-7788-99aabbccddeeff",
    );
    expect(generateUserId()).toBe("USR-FF00");
    expect(generateCampaignId()).toBe("CMP-FF00");
    spy.mockRestore();
  });
});

describe("adminReducer", () => {
  const initialState: AdminState = {
    users: [baseUser],
    campaigns: [baseCampaign],
  };

  it("adds new users and preserves existing ones", () => {
    const newUser: UserAccount = {
      ...baseUser,
      id: "USR-NEW",
      name: "New Operator",
      email: "new@aryzz-storezz.com",
      role: "Operator",
      createdAt: "2025-10-01T09:00:00.000Z",
      lastActive: "2025-10-02T10:00:00.000Z",
      referralCode: "NEWO-1234",
      referralsCount: 0,
      riskScore: 12,
    };
    const state = adminReducer(initialState, {
      type: "CREATE_USER",
      payload: newUser,
    });

    expect(state.users[0]).toEqual(newUser);
    expect(state.users).toHaveLength(initialState.users.length + 1);
  });

  it("bans and unbans accounts while adjusting risk score", () => {
    const banned = adminReducer(initialState, {
      type: "BAN_USER",
      payload: { id: baseUser.id },
    });
    expect(banned.users[0].status).toBe("banned");
    expect(banned.users[0].riskScore).toBe(100);

    const unbanned = adminReducer(banned, {
      type: "UNBAN_USER",
      payload: { id: baseUser.id },
    });
    expect(unbanned.users[0].status).toBe("active");
    expect(unbanned.users[0].riskScore).toBe(10);
  });

  it("increments referral counts and refreshes lastActive timestamp", () => {
    const before = initialState.users[0].lastActive;
    const updated = adminReducer(initialState, {
      type: "INCREMENT_REFERRAL",
      payload: { id: baseUser.id, delta: 3 },
    });

    expect(updated.users[0].referralsCount).toBe(baseUser.referralsCount + 3);
    expect(Date.parse(updated.users[0].lastActive)).toBeGreaterThan(
      Date.parse(before),
    );
  });

  it("prepends newly created campaigns", () => {
    const newCampaign: ReferralCampaign = {
      id: "CMP-NEW",
      name: "New Campaign",
      code: "NEW-CODE",
      reward: "$100 bonus",
      conversions: 0,
      status: "scheduled",
    };
    const state = adminReducer(initialState, {
      type: "CREATE_CAMPAIGN",
      payload: newCampaign,
    });

    expect(state.campaigns[0]).toEqual(newCampaign);
    expect(state.campaigns).toHaveLength(initialState.campaigns.length + 1);
  });
});

describe("analytics helpers", () => {
  it("computes normalized metrics from user data", () => {
    const metrics = computeUserMetrics([
      baseUser,
      { ...baseUser, id: "USR-BANNED", status: "banned", riskScore: 85 },
      { ...baseUser, id: "USR-PENDING", status: "pending", riskScore: 20 },
    ]);

    expect(metrics.active).toBe(1);
    expect(metrics.banned).toBe(1);
    expect(metrics.pending).toBe(1);
    expect(metrics.totalReferrals).toBe(baseUser.referralsCount * 3);
    expect(metrics.avgRisk).toBeGreaterThan(0);
  });

  it("derives the latest user activity timestamp", () => {
    const date = deriveLastUpdated([
      baseUser,
      { ...baseUser, id: "USR-OLDER", lastActive: "2025-01-01T00:00:00.000Z" },
      { ...baseUser, id: "USR-LATEST", lastActive: "2025-12-31T23:59:59.000Z" },
    ]);

    expect(date?.toISOString()).toBe("2025-12-31T23:59:59.000Z");
  });

  it("returns null when there is no valid timestamp", () => {
    const date = deriveLastUpdated([
      { ...baseUser, lastActive: "invalid-date" },
    ]);
    expect(date).toBeNull();
  });
});
