import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { loanProducts } from "../data/content";
import {usePageMeta} from "../lib/usePageMeta";

const detailsSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  idNumber: z.string().min(6, "Enter a valid national ID number"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  monthlyIncome: z.string().min(1, "Enter your estimated monthly income"),
});

type DetailsForm = z.infer<typeof detailsSchema>;

function formatKes(n: number) {
  return "KES " + Math.round(n).toLocaleString("en-KE");
}

export default function Apply() {
  usePageMeta("Apply for a Loan");
  const [step, setStep] = useState(1);
  const [productSlug, setProductSlug] = useState(loanProducts[0].slug);
  const [amount, setAmount] = useState(150000);
  const [months, setMonths] = useState(12);
  const [details, setDetails] = useState<DetailsForm | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const product = loanProducts.find((p) => p.slug === productSlug)!;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsForm>({ resolver: zodResolver(detailsSchema) });

  const estimate = useMemo(() => {
    const rate = 0.015;
    const totalInterest = amount * rate * months;
    return { monthly: (amount + totalInterest) / months };
  }, [amount, months]);

  const steps = ["Loan details", "Your information", "Review & submit"];

  if (submitted) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 py-24 text-center">
        <CheckCircle2 size={48} style={{ color: "var(--color-ember-500)" }} />
        <h1 className="mt-5 font-display text-2xl font-extrabold" style={{ color: "var(--color-navy-900)" }}>
          Application received
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">
          A loan officer will call {details?.phone} within 24 hours to verify your details for the{" "}
          {product.name} application of {formatKes(amount)}.
        </p>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Apply for a Loan"
        title="Three steps, most of it in one sitting"
        description="Check your eligibility instantly, tell us about yourself, then review before you submit."
      />

      <section className="mx-auto max-w-2xl px-5 py-16 lg:py-20">
        <div className="mb-10 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full font-display text-xs font-extrabold text-white"
                  style={{ backgroundColor: step > i ? "var(--color-ember-500)" : i + 1 === step ? "var(--color-navy-900)" : "var(--color-mist-200)" }}
                >
                  {i + 1}
                </div>
                <span className="hidden text-xs text-ink-500 sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className="mx-2 h-px flex-1" style={{ backgroundColor: "var(--color-mist-200)" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="rounded-3xl border border-mist-200 bg-white p-5 sm:p-7">
            <label className="mb-2 block text-sm text-ink-500">Loan product</label>
            <select
              value={productSlug}
              onChange={(e) => setProductSlug(e.target.value)}
              className="mb-6 w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm text-ink-700 focus:outline-none"
            >
              {loanProducts.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>

            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-ink-500">Loan amount</span>
                <span className="font-semibold tabular" style={{ color: "var(--color-navy-900)" }}>{formatKes(amount)}</span>
              </div>
              <input
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
                <span className="text-ink-500">Repayment term</span>
                <span className="font-semibold tabular" style={{ color: "var(--color-navy-900)" }}>{months} months</span>
              </div>
              <input
                type="range"
                min={1}
                max={36}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[var(--color-ember-500)]"
              />
            </div>

            <div className="mb-7 flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: "var(--color-ember-100)" }}>
              <ShieldCheck size={18} className="mt-0.5 shrink-0" style={{ color: "var(--color-ember-600)" }} />
              <p className="text-sm" style={{ color: "var(--color-ember-600)" }}>
                Estimated monthly repayment: <strong className="tabular">{formatKes(estimate.monthly)}</strong>. You look eligible
                for this range based on the product's typical limits — final approval depends on verification.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{ backgroundColor: "var(--color-navy-900)" }}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <form
            onSubmit={handleSubmit((data) => {
              setDetails(data);
              setStep(3);
            })}
            className="space-y-5 rounded-3xl border border-mist-200 bg-white p-5 sm:p-7"
          >
            <div>
              <label className="mb-1.5 block text-sm text-ink-500">Full name</label>
              <input {...register("fullName")} className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none" />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-ink-500">National ID number</label>
                <input {...register("idNumber")} className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none" />
                {errors.idNumber && <p className="mt-1 text-xs text-red-500">{errors.idNumber.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-ink-500">Phone number</label>
                <input {...register("phone")} className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none" />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink-500">Email address</label>
              <input {...register("email")} className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none" />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-ink-500">Estimated monthly income (KES)</label>
              <input {...register("monthlyIncome")} className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none" />
              {errors.monthlyIncome && <p className="mt-1 text-xs text-red-500">{errors.monthlyIncome.message}</p>}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 rounded-full border border-mist-200 px-5 py-3 text-sm font-semibold text-ink-700"
              >
                <ArrowLeft size={15} />
                Back
              </button>
              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--color-navy-900)" }}
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {step === 3 && details && (
          <div className="rounded-3xl border border-mist-200 bg-white p-5 sm:p-7">
            <h2 className="mb-5 font-display text-lg font-bold" style={{ color: "var(--color-navy-900)" }}>
              Review your application
            </h2>
            <div className="space-y-3 text-sm">
              {[
                ["Product", product.name],
                ["Amount", formatKes(amount)],
                ["Term", `${months} months`],
                ["Estimated monthly repayment", formatKes(estimate.monthly)],
                ["Full name", details.fullName],
                ["National ID", details.idNumber],
                ["Phone", details.phone],
                ["Email", details.email],
                ["Monthly income", details.monthlyIncome],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-mist-200 pb-2.5">
                  <span className="text-ink-500">{label}</span>
                  <span className="font-semibold" style={{ color: "var(--color-navy-900)" }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 rounded-full border border-mist-200 px-5 py-3 text-sm font-semibold text-ink-700"
              >
                <ArrowLeft size={15} />
                Back
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: "var(--color-ember-500)" }}
              >
                Submit Application
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
