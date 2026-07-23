import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Briefcase, Paperclip } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { jobOpenings, benefits } from "../data/content";
import { cn } from "../lib/utils";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  role: z.string().min(1, "Choose a role"),
  coverNote: z.string().min(10, "Say a little about why you're a fit"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;

const departments = ["All", ...Array.from(new Set(jobOpenings.map((j) => j.department)))];

export default function Careers() {
  const [department, setDepartment] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const filtered = useMemo(
    () => jobOpenings.filter((j) => department === "All" || j.department === department),
    [department]
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationForm>({ resolver: zodResolver(applicationSchema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    reset();
    setFileName(null);
  }

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the lending Kenyan businesses actually need"
        description="We're a small team that spends a lot of time with borrowers directly — most roles involve real client contact, not just spreadsheets."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-mist-200 p-6"
            >
              <h3 className="font-display text-sm font-bold" style={{ color: "var(--color-navy-900)" }}>
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{b.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "var(--color-mist-100)" }}>
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <h2 className="mb-8 text-center font-display text-2xl font-extrabold sm:text-3xl" style={{ color: "var(--color-navy-900)" }}>
            Open roles
          </h2>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setDepartment(d)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm",
                  department === d ? "text-white" : "border border-mist-200 bg-white text-ink-700 hover:bg-mist-50"
                )}
                style={department === d ? { backgroundColor: "var(--color-navy-900)" } : undefined}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((job) => (
              <div key={job.slug} className="flex flex-col gap-3 rounded-2xl bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-bold" style={{ color: "var(--color-navy-900)" }}>
                      {job.title}
                    </h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: "var(--color-ember-100)", color: "var(--color-ember-600)" }}
                    >
                      {job.type}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-ink-500">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-700">{job.description}</p>
                </div>
                <button
                  onClick={() => setValue("role", job.title)}
                  className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: "var(--color-navy-900)" }}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-16 lg:py-20">
        <h2 className="mb-8 text-center font-display text-2xl font-extrabold" style={{ color: "var(--color-navy-900)" }}>
          Send us your application
        </h2>

        <div className="rounded-3xl border border-mist-200 bg-white p-5 sm:p-7">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 size={40} style={{ color: "var(--color-ember-500)" }} />
              <h3 className="mt-4 font-display text-lg font-bold" style={{ color: "var(--color-navy-900)" }}>
                Application received
              </h3>
              <p className="mt-2 max-w-xs text-sm text-ink-500">
                Our recruitment team reviews applications weekly and will reach out if there's a fit.
              </p>
              <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold" style={{ color: "var(--color-ember-500)" }}>
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-ink-500">Full name</label>
                  <input {...register("fullName")} className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none" />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
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
                <label className="mb-1.5 block text-sm text-ink-500">Role you're applying for</label>
                <select
                  {...register("role")}
                  defaultValue=""
                  className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm text-ink-700 focus:outline-none"
                >
                  <option value="" disabled>Choose a role</option>
                  {jobOpenings.map((j) => (
                    <option key={j.slug} value={j.title}>{j.title}</option>
                  ))}
                  <option value="General application">General application</option>
                </select>
                {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-ink-500">Why you're a fit</label>
                <textarea
                  {...register("coverNote")}
                  rows={4}
                  className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none"
                />
                {errors.coverNote && <p className="mt-1 text-xs text-red-500">{errors.coverNote.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-ink-500">CV (PDF)</label>
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-mist-200 px-4 py-3 text-sm text-ink-500 hover:bg-mist-50">
                  <Paperclip size={15} />
                  {fileName ?? "Attach your CV"}
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
                style={{ backgroundColor: "var(--color-ember-500)" }}
              >
                {isSubmitting ? "Sending…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
