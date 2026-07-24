import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Info } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import PageHero from "../components/ui/PageHero";
import { usePageMeta } from "../lib/usePageMeta";
import { loanProducts, type LoanTier } from "../data/content";

function formatKes(n: number) {
  return "KES " + Math.round(n).toLocaleString("en-KE");
}

/** 4 weeks = 1 month, matching how Bidii itself defines weekly-repayment tiers. */
function termToMonths(term: number, unit: "weeks" | "months") {
  return unit === "months" ? term : term / 4;
}

function amountStep(tier: LoanTier) {
  return tier.maxAmount <= 100_000 ? 500 : 5_000;
}

type ScheduleRow = {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

// function buildSchedule(tier: LoanTier, amount: number, term: number) {
//   const termInMonths = termToMonths(term, tier.termUnit);
//   const interestTotal =
//     tier.interestBasis === "flat_over_term" ? amount * tier.interestRate : amount * tier.interestRate * termInMonths;
//   const totalRepayment = amount + interestTotal;
//   const installmentCount = Math.max(1, Math.round(term));
//   const principalPerInstallment = amount / installmentCount;
//   const interestPerInstallment = interestTotal / installmentCount;
//   const paymentPerInstallment = totalRepayment / installmentCount;
function buildSchedule(tier: LoanTier, amount: number, term: number) {
  const termInMonths = termToMonths(term, tier.termUnit);

  // Interest is billed per calendar month started, not prorated for partial
  // months — a term that crosses into a new month owes a full month's rate
  // for that month, even if it isn't completed.
  const billableMonths =
    tier.interestBasis === "per_month" ? Math.ceil(termInMonths) : termInMonths;

  const interestTotal =
    tier.interestBasis === "flat_over_term"
      ? amount * tier.interestRate
      : amount * tier.interestRate * billableMonths;

  const totalRepayment = amount + interestTotal;
  const installmentCount = Math.max(1, Math.round(term));
  const principalPerInstallment = amount / installmentCount;
  const interestPerInstallment = interestTotal / installmentCount;
  const paymentPerInstallment = totalRepayment / installmentCount;

  const rows: ScheduleRow[] = Array.from({ length: installmentCount }, (_, i) => ({
    period: i + 1,
    payment: paymentPerInstallment,
    principal: principalPerInstallment,
    interest: interestPerInstallment,
    balance: Math.max(amount - principalPerInstallment * (i + 1), 0),
  }));

  // One-time fees, all based on the requested principal.
  const processingFee = amount * tier.processingFeeRate;
  const lifeInsuranceFee = amount * tier.lifeInsuranceFeeRate;
  const chattelFee = tier.chattelFee ?? 0;
  const inchargeFee = tier.inchargeFee ?? 0;
  const exciseDuty = (tier.exciseDutyOnFeesRate ?? 0) * (processingFee + chattelFee);
  const trackingFeePerMonth = tier.trackingFeePerMonth ?? 0;
  const trackingFeeTotal = trackingFeePerMonth * termInMonths;

  // Registration fee is paid upfront by the client as a separate facilitation
  // fee (per the SME appraisal process); everything else is deducted from
  // the disbursed loan proceeds.
  const deductedFromLoan = processingFee + lifeInsuranceFee + chattelFee + exciseDuty;
  const netDisbursed = amount - deductedFromLoan;

  return {
    rows,
    interestTotal,
    totalRepayment,
    paymentPerInstallment,
    processingFee,
    lifeInsuranceFee,
    chattelFee,
    inchargeFee,
    exciseDuty,
    trackingFeePerMonth,
    trackingFeeTotal,
    registrationFee: tier.registrationFee,
    netDisbursed,
  };
}

export default function Calculator() {
  usePageMeta("Loan Calculator");

  const [productSlug, setProductSlug] = useState(loanProducts[0].slug);
  const product = useMemo(
    () => loanProducts.find((p) => p.slug === productSlug) ?? loanProducts[0],
    [productSlug]
  );

  const [tierId, setTierId] = useState(product.tiers[0].id);
  const tier = useMemo(
    () => product.tiers.find((t) => t.id === tierId) ?? product.tiers[0],
    [product, tierId]
  );

  const [amount, setAmount] = useState(tier.minAmount);
  const [term, setTerm] = useState(tier.minTerm);

  // Check Off Loans are underwritten by salary affordability, not a chosen
  // amount — see the CW formula from Bidii's own check-off training material.
  const [basicSalary, setBasicSalary] = useState(60000);
  const [netSalary, setNetSalary] = useState(45000);

  // Reset tier + clamp amount/term whenever the product or tier changes.
  // This is React's recommended "adjust state during render" pattern
  // (https://react.dev/learn/you-might-not-need-an-effect) rather than an
  // effect, since it's synchronizing state to a prop/selection change, not
  // an external system — an effect here would cause an extra render pass.
  const [prevProductSlug, setPrevProductSlug] = useState(productSlug);
  const [prevTierId, setPrevTierId] = useState(tierId);

  if (productSlug !== prevProductSlug) {
    setPrevProductSlug(productSlug);
    const firstTier = product.tiers[0];
    setTierId(firstTier.id);
    setPrevTierId(firstTier.id);
    setAmount(firstTier.minAmount);
    setTerm(firstTier.minTerm);
  } else if (tierId !== prevTierId) {
    setPrevTierId(tierId);
    setAmount((a) => Math.min(Math.max(a, tier.minAmount), tier.maxAmount));
    setTerm((t) => Math.min(Math.max(t, tier.minTerm), tier.maxTerm));
  }

  const affordability = useMemo(() => {
    const cw = Math.max(0, netSalary - basicSalary / 3);
    const termInMonths = termToMonths(term, tier.termUnit);
    const maxAmount = (cw * termInMonths) / (1 + tier.interestRate * termInMonths);
    return { cw, maxAmount: Math.max(0, Math.round(maxAmount)) };
  }, [basicSalary, netSalary, term, tier]);

  const effectiveAmount = product.isAffordabilityBased ? affordability.maxAmount : amount;
  const schedule = useMemo(
    () => buildSchedule(tier, Math.max(effectiveAmount, 1), term),
    [tier, effectiveAmount, term]
  );

  const periodLabel = tier.repaymentFrequency === "weekly" ? "Week" : "Month";
  const installmentLabel = tier.repaymentFrequency === "weekly" ? "Weekly repayment" : "Monthly repayment";

  function downloadCsv() {
    const header = `${periodLabel},Payment,Principal,Interest,Remaining Balance\n`;
    const body = schedule.rows
      .map((r) => `${r.period},${r.payment.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}`)
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bidii-Credit-${product.slug.charAt(0).toUpperCase() + product.slug.slice(1)} (${tier.label.replace(/\s+/g, "-")})-Repayment-Schedule.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHero
        eyebrow="Bidii Credit Loan Calculator"
        title="See your full repayment schedule"
        description="Choose a product and plan, set your amount and term, and get a month-by-month or week-by-week breakdown you can download before you apply."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="h-fit rounded-3xl border border-mist-200 bg-surface p-5 sm:p-7"
          >
            <div className="mb-5">
              <label className="mb-2 block text-sm text-ink-500">Loan product</label>
              <select
                value={productSlug}
                onChange={(e) => setProductSlug(e.target.value)}
                className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm text-ink-700 focus:outline-none"
              >
                {loanProducts.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </div>

            {product.tiers.length > 1 && (
              <div className="mb-6">
                <label className="mb-2 block text-sm text-ink-500">Plan</label>
                <select
                  value={tierId}
                  onChange={(e) => setTierId(e.target.value)}
                  className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm text-ink-700 focus:outline-none"
                >
                  {product.tiers.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
            )}

            {product.isAffordabilityBased ? (
              <>
                <div className="mb-4 flex items-start gap-2.5 rounded-xl p-4 text-xs leading-relaxed" style={{ backgroundColor: "var(--color-ember-100)", color: "var(--color-ember-600)" }}>
                  <Info size={15} className="mt-0.5 shrink-0" />
                  Check Off Loans are underwritten by salary affordability, not a fixed
                  amount. Rate shown (2% monthly) is a placeholder pending confirmed
                  figures for this product.
                </div>

                <div className="mb-5">
                  <label className="mb-2 block text-sm text-ink-500">Basic salary (KES)</label>
                  <input
                    type="number"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                    className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm tabular focus:outline-none"
                  />
                </div>
                <div className="mb-5">
                  <label className="mb-2 block text-sm text-ink-500">Net salary (KES)</label>
                  <input
                    type="number"
                    value={netSalary}
                    onChange={(e) => setNetSalary(Number(e.target.value))}
                    className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm tabular focus:outline-none"
                  />
                </div>

                <div className="mb-6 rounded-xl p-4 text-sm" style={{ backgroundColor: "var(--color-mist-50)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-ink-500">Credit worthiness (max installment)</span>
                    <span className="font-semibold tabular" style={{ color: "var(--color-ink-900)" }}>{formatKes(affordability.cw)}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-ink-500">CW = Net salary − ⅓ × Basic salary</p>
                </div>
              </>
            ) : (
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <label htmlFor="amount" className="text-ink-500">Loan amount</label>
                  <span className="font-semibold tabular" style={{ color: "var(--color-ink-900)" }}>{formatKes(amount)}</span>
                </div>
                <input
                  id="amount"
                  type="range"
                  min={tier.minAmount}
                  max={tier.maxAmount}
                  step={amountStep(tier)}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-[var(--color-ember-500)]"
                />
                <div className="mt-1 flex justify-between text-xs text-ink-500">
                  <span>{formatKes(tier.minAmount)}</span>
                  <span>{formatKes(tier.maxAmount)}</span>
                </div>
              </div>
            )}

            <div className="mb-7">
              <div className="mb-2 flex items-center justify-between text-sm">
                <label htmlFor="term" className="text-ink-500">Repayment term</label>
                <span className="font-semibold tabular" style={{ color: "var(--color-ink-900)" }}>
                  {term} {tier.termUnit}
                </span>
              </div>
              <input
                id="term"
                type="range"
                min={tier.minTerm}
                max={tier.maxTerm}
                step={1}
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full accent-[var(--color-ember-500)]"
              />
              <div className="mt-1 flex justify-between text-xs text-ink-500">
                <span>{tier.minTerm} {tier.termUnit}</span>
                <span>{tier.maxTerm} {tier.termUnit}</span>
              </div>
            </div>

            {product.isAffordabilityBased && (
              <div className="mb-6 rounded-xl p-4" style={{ backgroundColor: "var(--color-mist-50)" }}>
                <p className="text-xs text-ink-500">Maximum loan amount you qualify for</p>
                <p className="mt-1 font-display text-xl font-extrabold tabular" style={{ color: "var(--color-ink-900)" }}>
                  {formatKes(affordability.maxAmount)}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 rounded-2xl p-5" style={{ backgroundColor: "var(--color-mist-50)" }}>
              <div>
                <p className="text-xs text-ink-500">{installmentLabel}</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-ink-900)" }}>
                  {formatKes(schedule.paymentPerInstallment)}
                </p>
                {schedule.trackingFeePerMonth > 0 && (
                  <p className="mt-0.5 text-[11px] text-ink-500">+ {formatKes(schedule.trackingFeePerMonth)}/month tracking fee</p>
                )}
              </div>
              <div>
                <p className="text-xs text-ink-500">Total interest</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-ink-900)" }}>
                  {formatKes(schedule.interestTotal)}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Total repayment</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-ink-900)" }}>
                  {formatKes(schedule.totalRepayment)}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Interest rate</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-ink-900)" }}>
                  {(tier.interestRate * 100).toFixed(1)}%{tier.interestBasis === "per_month" ? "/mo" : " flat"}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2 rounded-2xl border border-mist-200 p-5 text-sm">
              <p className="mb-2 font-display text-xs font-bold uppercase tracking-wide text-ink-500">Fees & charges</p>
              <div className="flex items-center justify-between">
                <span className="text-ink-500">Registration fee (paid upfront, separate)</span>
                <span className="tabular text-ink-700">{formatKes(schedule.registrationFee)}</span>
              </div>
              {schedule.inchargeFee > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Incharge fee (paid upfront, separate)</span>
                  <span className="tabular text-ink-700">{formatKes(schedule.inchargeFee)}</span>
                </div>
              )}
              {schedule.processingFee > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Loan processing fee ({(tier.processingFeeRate * 100).toFixed(0)}%)</span>
                  <span className="tabular text-ink-700">{formatKes(schedule.processingFee)}</span>
                </div>
              )}

              {schedule.lifeInsuranceFee > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Life insurance fee ({(tier.lifeInsuranceFeeRate * 100).toFixed(0)}%)</span>
                  <span className="tabular text-ink-700">{formatKes(schedule.lifeInsuranceFee)}</span>
                </div>
              )}
              {schedule.chattelFee > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Chattel/legal fee</span>
                  <span className="tabular text-ink-700">{formatKes(schedule.chattelFee)}</span>
                </div>
              )}

              {schedule.exciseDuty > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Excise duty (20% on LPF + chattel)</span>
                  <span className="tabular text-ink-700">{formatKes(schedule.exciseDuty)}</span>
                </div>
              )}
              {tier.guarantors !== null && (
                <div className="flex items-center justify-between">
                  <span className="text-ink-500">Guarantors required</span>
                  <span className="tabular text-ink-700">{tier.guarantors}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-mist-200 pt-2 font-semibold">
                <span style={{ color: "var(--color-ink-900)" }}>Net amount disbursed</span>
                <span className="tabular" style={{ color: "var(--color-ink-900)" }}>{formatKes(schedule.netDisbursed)}</span>
              </div>
            </div>

            <button
              onClick={downloadCsv}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "var(--color-navy-900)" }}
            >
              <Download size={16} />
              Download Repayment Schedule (CSV)
            </button>
            <p className="mt-3 text-xs text-ink-500">
              Estimate only. Your final offer depends on product terms and your credit assessment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col rounded-3xl border border-mist-200 bg-surface p-5 sm:p-7"
          >
            <p className="mb-4 font-display text-sm font-bold" style={{ color: "var(--color-ink-900)" }}>
              Outstanding balance over time
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={schedule.rows} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-navy-700)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-navy-700)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-mist-200)" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip
                    formatter={((v: unknown) => formatKes(Number(Array.isArray(v) ? v[0] : v) || 0)) as never}
                    labelFormatter={(l) => `${periodLabel} ${l}`}
                  />
                  <Area type="monotone" dataKey="balance" stroke="var(--color-navy-900)" fill="url(#balanceFill)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 max-h-75 overflow-auto rounded-xl border border-mist-200">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="sticky top-0 bg-mist-50 text-xs text-ink-500">
                  <tr>
                    <th className="px-3 py-2.5 font-medium sm:px-4">{periodLabel}</th>
                    <th className="px-3 py-2.5 font-medium sm:px-4">Payment</th>
                    <th className="px-3 py-2.5 font-medium sm:px-4">Interest</th>
                    <th className="px-3 py-2.5 font-medium sm:px-4">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist-200">
                  {schedule.rows.map((r) => (
                    <tr key={r.period}>
                      <td className="px-3 py-2.5 tabular text-ink-700 sm:px-4">{r.period}</td>
                      <td className="px-3 py-2.5 tabular text-ink-700 sm:px-4">{formatKes(r.payment)}</td>
                      <td className="px-3 py-2.5 tabular text-ink-500 sm:px-4">{formatKes(r.interest)}</td>
                      <td className="px-3 py-2.5 tabular font-semibold sm:px-4" style={{ color: "var(--color-ink-900)" }}>
                        {formatKes(r.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 rounded-2xl border border-mist-200 p-5 pr-0">
              <p className="mb-3 font-display text-xs font-bold uppercase tracking-wide text-ink-500">
                What you'll need for {product.name}
              </p>
              <div className="lg:max-h-75 overflow-auto">
              {product.eligibility.length > 0 && (
                <>
                  <p className="mb-1.5 text-xs font-semibold text-ink-700">Eligibility</p>
                  <ul className="mb-4 space-y-1 text-sm text-ink-700">
                    {product.eligibility.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-ink-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {product.requirements.length > 0 && (
                <>
                  <p className="mb-1.5 text-xs font-semibold text-ink-700">Documents required</p>
                  <ul className="space-y-1 text-sm text-ink-700">
                    {product.requirements.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-ink-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              </div>
            </div>
            <p className="mt-auto text-center text-sm text-orange-500 italic">
              Partners For Growth
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
