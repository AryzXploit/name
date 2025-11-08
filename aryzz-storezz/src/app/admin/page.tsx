"use client";

import {
  type FormEvent,
  type ReactNode,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Ban,
  CheckCircle2,
  CircleDot,
  Clock3,
  Gauge,
  Lock,
  Plus,
  ShieldCheck,
  ShieldOff,
  UserPlus,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import {
  initialCampaigns,
  initialUsers,
  type AccountStatus,
  type ReferralCampaign,
  type UserAccount,
} from "@/lib/admin-data";
import {
  adminReducer,
  computeUserMetrics,
  defaultRoles,
  deriveLastUpdated,
  generateCampaignId,
  generateReferralCode,
  generateUserId,
} from "@/lib/admin-logic";
import { formatDate } from "@/lib/utils";

const statusBadgeStyles: Record<AccountStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  banned: "bg-rose-500/15 text-rose-300 border-rose-400/30",
  pending: "bg-amber-500/15 text-amber-300 border-amber-400/30",
};

export default function AdminConsole() {
  const [state, dispatch] = useReducer(adminReducer, {
    users: initialUsers,
    campaigns: initialCampaigns,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: defaultRoles[2] ?? "Operator",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [campaignName, setCampaignName] = useState("");
  const [campaignReward, setCampaignReward] = useState("");
  const [campaignStatus, setCampaignStatus] =
    useState<ReferralCampaign["status"]>("running");

  const metrics = useMemo(() => {
    const snapshot = computeUserMetrics(state.users);
    return {
      ...snapshot,
      avgRisk: Number.isNaN(snapshot.avgRisk) ? 0 : snapshot.avgRisk,
    };
  }, [state.users]);

  const lastUpdated = useMemo(() => {
    const date = deriveLastUpdated(state.users);
    if (!date) {
      return "No activity yet";
    }
    return `${formatDate(date)} · ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }, [state.users]);

  const handleCreateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim().toLowerCase();

    if (trimmedName.length < 3) {
      setFormError("Nama lengkap minimal 3 karakter.");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/u.test(trimmedEmail)) {
      setFormError("Format email tidak valid.");
      return;
    }
    if (state.users.some((user) => user.email === trimmedEmail)) {
      setFormError("Email sudah terdaftar di sistem.");
      return;
    }

    const newUser: UserAccount = {
      id: generateUserId(),
      name: trimmedName,
      email: trimmedEmail,
      role: form.role,
      status: "active",
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      referralCode: generateReferralCode(trimmedName),
      referralsCount: 0,
      riskScore: 12,
    };

    dispatch({ type: "CREATE_USER", payload: newUser });
    setForm({ name: "", email: "", role: defaultRoles[2] ?? "Operator" });
    setFormError(null);
  };

  const handleBanToggle = (user: UserAccount) => {
    if (user.status === "banned") {
      dispatch({ type: "UNBAN_USER", payload: { id: user.id } });
    } else {
      dispatch({ type: "BAN_USER", payload: { id: user.id } });
    }
  };

  const handleCampaignCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = campaignName.trim();
    if (name.length < 4) {
      return;
    }

    const newCampaign: ReferralCampaign = {
      id: generateCampaignId(),
      name,
      code: generateReferralCode(name),
      reward: campaignReward.trim() || "Custom incentive",
      conversions: 0,
      status: campaignStatus,
    };

    dispatch({ type: "CREATE_CAMPAIGN", payload: newCampaign });
    setCampaignName("");
    setCampaignReward("");
    setCampaignStatus("running");
  };

  return (
    <div className="min-h-screen bg-slate-950/95 pb-24">
      <header className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
              Aryzz-Storezz Admin Console
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white lg:text-4xl">
              Secure governance & growth intelligence
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Kelola akun, enforce zero-trust access, dan orkestrasi referral yang
              aman. Semua perubahan tercatat, tervalidasi, dan siap audit.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Pembaruan terakhir · {lastUpdated}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-slate-500/70 hover:bg-slate-900/80"
            >
              <ArrowUpRight className="h-4 w-4" />
              Lihat landing page
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_12px_45px_rgba(56,189,248,0.35)] transition-all hover:shadow-[0_16px_55px_rgba(56,189,248,0.45)]"
            >
              <ShieldCheck className="h-4 w-4" />
              Audit konfigurasi
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-10 px-6 lg:px-10">
        <section className="grid gap-6 rounded-[2.5rem] border border-slate-800/60 bg-slate-950/80 p-8 shadow-[0_25px_70px_rgba(15,23,42,0.5)] lg:grid-cols-4">
          <StatCard
            icon={<UsersRound className="h-5 w-5" />}
            label="Akun aktif"
            value={metrics.active.toString()}
            helper="Diproteksi MFA & kebijakan adaptif"
            tone="emerald"
          />
          <StatCard
            icon={<Ban className="h-5 w-5" />}
            label="Akun diblokir"
            value={metrics.banned.toString()}
            helper="Menunggu analisis lanjutan"
            tone="rose"
          />
          <StatCard
            icon={<CircleDot className="h-5 w-5" />}
            label="Akun pending"
            value={metrics.pending.toString()}
            helper="Butuh verifikasi manual"
            tone="amber"
          />
          <StatCard
            icon={<Gauge className="h-5 w-5" />}
            label="Rata-rata skor risiko"
            value={`${metrics.avgRisk.toFixed(1)}`}
            helper={`${metrics.totalReferrals} referral tervalidasi`}
            tone="sky"
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex h-full flex-col rounded-[2.5rem] border border-slate-800/60 bg-slate-950/70 p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
                  Manajemen akun
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Buat dan kontrol akses aman
                </h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-300">
                <Lock className="h-4 w-4 text-sky-300" />
                Policy enforced
              </span>
            </div>

            <form
              onSubmit={handleCreateUser}
              className="mt-8 grid gap-4 sm:grid-cols-2"
              noValidate
            >
              <FormField
                label="Nama lengkap"
                placeholder="Masukkan nama"
                value={form.name}
                onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
              />
              <FormField
                label="Email kerja"
                type="email"
                placeholder="nama@perusahaan.com"
                value={form.email}
                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
              />
              <FormSelect
                label="Role"
                value={form.role}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, role: value as UserAccount["role"] }))
                }
                  options={defaultRoles}
              />
              <button
                type="submit"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:shadow-[0_15px_50px_rgba(56,189,248,0.45)]"
              >
                <UserPlus className="h-4 w-4" />
                Buat akun aman
              </button>
            </form>
            {formError && (
              <p className="mt-3 text-sm font-medium text-rose-300">{formError}</p>
            )}

            <div className="mt-10 space-y-4">
              {state.users.map((user) => (
                <article
                  key={user.id}
                  className="rounded-3xl border border-slate-800/60 bg-slate-950/70 p-5 transition-colors hover:border-sky-400/40"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${statusBadgeStyles[user.status]}`}
                      >
                        {user.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleBanToggle(user)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-100 transition-all hover:border-slate-500/70 hover:bg-slate-900/70"
                      >
                        {user.status === "banned" ? (
                          <>
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                            Pulihkan
                          </>
                        ) : (
                          <>
                            <ShieldOff className="h-3.5 w-3.5 text-rose-300" />
                            Blokir
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 text-xs text-slate-300 sm:grid-cols-4">
                    <InfoBadge label="Role" value={user.role} />
                    <InfoBadge
                      label="Dibuat"
                      value={formatDate(new Date(user.createdAt))}
                    />
                    <InfoBadge
                      label="Terakhir aktif"
                      value={formatDate(new Date(user.lastActive))}
                    />
                    <InfoBadge
                      label="Kode referral"
                      value={user.referralCode}
                      emphasize
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-3 py-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                      {user.referralsCount} referral tervalidasi
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-3 py-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />
                      Skor risiko {user.riskScore}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "INCREMENT_REFERRAL",
                          payload: { id: user.id },
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-sky-400/60 hover:text-sky-200"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Tambah referral
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-950/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
                Snapshot keamanan
              </p>
              <div className="mt-4 space-y-4">
                <SecurityRow
                  icon={<ShieldCheck className="h-4 w-4 text-emerald-300" />}
                  title="Guardrail kebijakan"
                  description="Semua perubahan konfigurasi diverifikasi otomatis sebelum aktif."
                />
                <SecurityRow
                  icon={<Lock className="h-4 w-4 text-sky-300" />}
                  title="Proteksi sesi"
                  description="SSO + passkey wajib untuk role admin dan finance."
                />
                <SecurityRow
                  icon={<Clock3 className="h-4 w-4 text-amber-300" />}
                  title="Audit time-series"
                  description="Log aktivitas tersimpan 13 bulan, siap ekspor ke GRC."
                />
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-800/60 bg-slate-950/70 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
                    Kampanye referral
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Otomasi pertumbuhan aman
                  </h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  Guarded
                </span>
              </div>

              <form
                onSubmit={handleCampaignCreate}
                className="mt-6 space-y-3"
                noValidate
              >
                <FormField
                  label="Nama kampanye"
                  placeholder="Contoh: Trusted Partners"
                  value={campaignName}
                  onChange={setCampaignName}
                />
                <FormField
                  label="Insentif"
                  placeholder="Contoh: $500 onboarding credit"
                  value={campaignReward}
                  onChange={setCampaignReward}
                />
                <div className="space-y-2 text-xs text-slate-400">
                  <label className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                    Status
                  </label>
                  <select
                    value={campaignStatus}
                    onChange={(event) =>
                      setCampaignStatus(event.target.value as ReferralCampaign["status"])
                    }
                    className="w-full rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 focus:border-sky-400/60 focus:outline-none"
                  >
                    <option value="running">Running</option>
                    <option value="paused">Paused</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-shadow hover:shadow-[0_15px_50px_rgba(56,189,248,0.45)]"
                >
                  <Plus className="h-4 w-4" />
                  Buat kampanye
                </button>
              </form>

              <div className="mt-8 space-y-4">
                {state.campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="rounded-2xl border border-slate-800/60 bg-slate-950/70 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {campaign.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          Reward: {campaign.reward}
                        </p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                        {campaign.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>Kode: {campaign.code}</span>
                      <span>{campaign.conversions} konversi</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-slate-800/60 bg-gradient-to-br from-rose-500/15 via-slate-950/60 to-slate-950/75 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.38em] text-rose-200/70">
                Proteksi kebocoran
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                Tidak ada misconfig. Tidak ada celah.
              </h3>
              <p className="mt-3 text-sm text-rose-100/80">
                Engine validasi konfigurasi memblok perubahan berisiko tinggi
                secara real-time. Setiap policy membutuhkan review ganda dan
    tersimpan otomatis dalam log yang dapat diaudit.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-rose-100/80">
                <li>• Enforcement zero-trust pada semua endpoint internal</li>
                <li>• Analisis konfigurasi berjalan tiap 15 menit</li>
                <li>• Rekomendasi remedi dikirim ke channel insiden</li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
  tone: "emerald" | "rose" | "amber" | "sky";
};

function StatCard({ icon, label, value, helper, tone }: StatCardProps) {
  const toneMap: Record<
    StatCardProps["tone"],
    { bg: string; text: string; ring: string }
  > = {
    emerald: {
      bg: "bg-emerald-500/15",
      text: "text-emerald-200",
      ring: "ring-emerald-400/50",
    },
    rose: {
      bg: "bg-rose-500/15",
      text: "text-rose-200",
      ring: "ring-rose-400/50",
    },
    amber: {
      bg: "bg-amber-500/15",
      text: "text-amber-200",
      ring: "ring-amber-400/50",
    },
    sky: {
      bg: "bg-sky-500/15",
      text: "text-sky-200",
      ring: "ring-sky-400/50",
    },
  };

  const palette = toneMap[tone];

  return (
    <div className="flex flex-col rounded-3xl border border-slate-800/60 bg-slate-950/70 p-5">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${palette.bg} ${palette.text} ring-1 ${palette.ring}`}
      >
        {icon}
      </span>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{helper}</p>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email";
};

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-xs text-slate-300">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required
        className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 focus:border-sky-400/60 focus:outline-none"
      />
    </label>
  );
}

type FormSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
};

function FormSelect({ label, value, onChange, options }: FormSelectProps) {
  return (
    <label className="flex flex-col gap-2 text-xs text-slate-300">
      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 focus:border-sky-400/60 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type InfoBadgeProps = {
  label: string;
  value: string;
  emphasize?: boolean;
};

function InfoBadge({ label, value, emphasize }: InfoBadgeProps) {
  return (
    <div className="space-y-1 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3">
      <p className="text-[0.6rem] uppercase tracking-[0.32em] text-slate-500">
        {label}
      </p>
      <p
        className={`text-sm font-semibold ${
          emphasize ? "text-sky-300" : "text-slate-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

type SecurityRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function SecurityRow({ icon, title, description }: SecurityRowProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/70 p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/70">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}
