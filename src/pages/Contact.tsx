import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import PageHero from "../components/ui/PageHero";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  subject: z.string().min(1, "Choose a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 700));
    setSubmitted(true);
    reset();
  }

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Talk to a real loan officer"
        description="Reach us by phone, email, or visit a branch. For fastest response on an existing application, call the branch handling it directly."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-mist-200 p-6">
              <Phone size={18} style={{ color: "var(--color-navy-900)" }} />
              <p className="mt-3 font-display text-sm font-bold" style={{ color: "var(--color-navy-900)" }}>
                Call us
              </p>
              <p className="mt-1 text-sm text-ink-500">+254 700 000 000</p>
              <p className="text-xs text-ink-500">Mon–Fri 8:00–17:00, Sat 9:00–13:00</p>
            </div>
            <div className="rounded-2xl border border-mist-200 p-6">
              <Mail size={18} style={{ color: "var(--color-navy-900)" }} />
              <p className="mt-3 font-display text-sm font-bold" style={{ color: "var(--color-navy-900)" }}>
                Email us
              </p>
              <p className="mt-1 text-sm text-ink-500">hello@bidiicreditkenya.co.ke</p>
            </div>
            <div className="rounded-2xl border border-mist-200 p-6">
              <MapPin size={18} style={{ color: "var(--color-navy-900)" }} />
              <p className="mt-3 font-display text-sm font-bold" style={{ color: "var(--color-navy-900)" }}>
                Head office
              </p>
              <p className="mt-1 text-sm text-ink-500">Bidii House, Moi Avenue, Nairobi</p>
            </div>
          </div>

          <div className="rounded-3xl border border-mist-200 bg-white p-5 sm:p-7 lg:p-9">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 size={40} style={{ color: "var(--color-ember-500)" }} />
                <h2 className="mt-4 font-display text-lg font-bold" style={{ color: "var(--color-navy-900)" }}>
                  Message sent
                </h2>
                <p className="mt-2 max-w-xs text-sm text-ink-500">
                  A member of our team will get back to you within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-semibold"
                  style={{ color: "var(--color-ember-500)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm text-ink-500">Full name</label>
                    <input
                      {...register("name")}
                      className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-ink-500">Phone number</label>
                    <input
                      {...register("phone")}
                      className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-ink-500">Email address</label>
                  <input
                    {...register("email")}
                    className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-ink-500">Subject</label>
                  <select
                    {...register("subject")}
                    defaultValue=""
                    className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm text-ink-700 focus:outline-none"
                  >
                    <option value="" disabled>Choose a subject</option>
                    <option value="loan-inquiry">Loan Inquiry</option>
                    <option value="existing-loan">Existing Loan</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-ink-500">Message</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full rounded-xl border border-mist-200 px-4 py-2.5 text-sm focus:outline-none"
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-ember-500)" }}
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
