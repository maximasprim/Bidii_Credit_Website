import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import PageHero from "../components/ui/PageHero";
import { loanProducts } from "../data/content";

function formatKes(n: number) {
  return "KES " + Math.round(n).toLocaleString("en-KE");
}

const rateBySlug: Record<string, number> = {
  "business-loans": 0.015,
  "asset-finance": 0.013,
  "salary-advance": 0.08,
  "logbook-loans": 0.016,
  "sme-loans": 0.014,
  "emergency-loans": 0.09,
};

export default function Calculator() {
  const [productSlug, setProductSlug] = useState("business-loans");
  const [amount, setAmount] = useState(150000);
  const [months, setMonths] = useState(12);

  const monthlyRate = rateBySlug[productSlug] ?? 0.015;

  const schedule = useMemo(() => {
    const totalInterest = amount * monthlyRate * months;
    const totalRepayment = amount + totalInterest;
    const monthlyPayment = totalRepayment / months;
    const principalPerMonth = amount / months;
    const interestPerMonth = totalInterest / months;

    const rows = Array.from({ length: months }, (_, i) => {
      const balance = Math.max(amount - principalPerMonth * (i + 1), 0);
      return {
        month: i + 1,
        payment: monthlyPayment,
        principal: principalPerMonth,
        interest: interestPerMonth,
        balance,
      };
    });

    return { rows, totalInterest, totalRepayment, monthlyPayment };
  }, [amount, months, monthlyRate]);

  function downloadCsv() {
    const header = "Month,Payment,Principal,Interest,Remaining Balance\n";
    const body = schedule.rows
      .map((r) => `${r.month},${r.payment.toFixed(2)},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.balance.toFixed(2)}`)
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bidii-repayment-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <PageHero
        eyebrow="Loan Calculator"
        title="See your full repayment schedule"
        description="Choose a product, set your amount and term, and get a month-by-month breakdown you can download before you apply."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="h-fit rounded-3xl border border-mist-200 bg-white p-5 sm:p-7"
          >
            <div className="mb-6">
              <label className="mb-2 block text-sm text-ink-500">Loan product</label>
              <select
                value={productSlug}
                onChange={(e) => setProductSlug(e.target.value)}
                className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm text-ink-700 focus:outline-none"
                style={{ borderColor: "var(--color-mist-200)" }}
              >
                {loanProducts.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name} ({p.rateFrom})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <label htmlFor="amount" className="text-ink-500">Loan amount</label>
                <span className="font-semibold tabular" style={{ color: "var(--color-navy-900)" }}>
                  {formatKes(amount)}
                </span>
              </div>
              <input
                id="amount"
                type="range"
                min={10000}
                max={1000000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-[var(--color-ember-500)]"
              />
            </div>

            <div className="mb-7">
              <div className="mb-2 flex items-center justify-between text-sm">
                <label htmlFor="months" className="text-ink-500">Repayment term</label>
                <span className="font-semibold tabular" style={{ color: "var(--color-navy-900)" }}>
                  {months} months
                </span>
              </div>
              <input
                id="months"
                type="range"
                min={1}
                max={36}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[var(--color-ember-500)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl p-5" style={{ backgroundColor: "var(--color-mist-50)" }}>
              <div>
                <p className="text-xs text-ink-500">Monthly repayment</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-navy-900)" }}>
                  {formatKes(schedule.monthlyPayment)}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Total interest</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-navy-900)" }}>
                  {formatKes(schedule.totalInterest)}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Total repayment</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-navy-900)" }}>
                  {formatKes(schedule.totalRepayment)}
                </p>
              </div>
              <div>
                <p className="text-xs text-ink-500">Effective monthly rate</p>
                <p className="mt-1 font-display text-lg font-extrabold tabular" style={{ color: "var(--color-navy-900)" }}>
                  {(monthlyRate * 100).toFixed(1)}%
                </p>
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
            className="rounded-3xl border border-mist-200 bg-white p-5 sm:p-7"
          >
            <p className="mb-4 font-display text-sm font-bold" style={{ color: "var(--color-navy-900)" }}>
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
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip
                    formatter={((v: unknown) => formatKes(Number(Array.isArray(v) ? v[0] : v) || 0)) as never}
                    labelFormatter={(l) => `Month ${l}`}
                  />
                  <Area type="monotone" dataKey="balance" stroke="var(--color-navy-900)" fill="url(#balanceFill)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 max-h-72 overflow-auto rounded-xl border border-mist-200">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="sticky top-0 bg-mist-50 text-xs text-ink-500">
                  <tr>
                    <th className="px-3 py-2.5 font-medium sm:px-4">Month</th>
                    <th className="px-3 py-2.5 font-medium sm:px-4">Payment</th>
                    <th className="px-3 py-2.5 font-medium sm:px-4">Interest</th>
                    <th className="px-3 py-2.5 font-medium sm:px-4">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist-200">
                  {schedule.rows.map((r) => (
                    <tr key={r.month}>
                      <td className="px-3 py-2.5 tabular text-ink-700 sm:px-4">{r.month}</td>
                      <td className="px-3 py-2.5 tabular text-ink-700 sm:px-4">{formatKes(r.payment)}</td>
                      <td className="px-3 py-2.5 tabular text-ink-500 sm:px-4">{formatKes(r.interest)}</td>
                      <td className="px-3 py-2.5 tabular font-semibold sm:px-4" style={{ color: "var(--color-navy-900)" }}>
                        {formatKes(r.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
