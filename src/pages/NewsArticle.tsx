import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { articles } from "../data/content";
import { usePageMeta } from "../lib/usePageMeta";
import CTABand from "../components/home/CTABand";
import heroBackground from "../../public/Hero_Bg2.jpg";
import GrowthLine from "../components/ui/GrowthLine";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
}

export default function NewsArticle() {
    const { slug } = useParams();
    const article = articles.find((a) => a.slug === slug);
    usePageMeta(article?.title ?? "News & Insights");

    if (!article) return <Navigate to="/news" replace />;

    const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 2);

    return (
        <>
            <section
                className="relative overflow-hidden bg-top bg-no-repeat bg-cover bg-center sm:bg-center px-5 py-20 lg:px-8 lg:py-28"
                style={{
                    backgroundImage: `url(${heroBackground})`,
                    // backgroundColor: "var(--color-navy-900)",
                }}
            >
                <div className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 90% 60% at 20% 0%, var(--color-navy-700) 0%, var(--color-navy-900) 45%, var(--color-navy-950) 100%)",
                        opacity: 0.75,
                    }}
                />
                <GrowthLine
                    className="pointer-events-none absolute -top-2 right-0 h-32 w-[55%] opacity-20 lg:h-44 lg:w-[35%]"
                    stroke="var(--color-ember-400)"
                    animate={false}
                />
                <div className="relative mx-auto max-w-3xl">
                    <p className="text-xs text-white/50">
                        <Link to="/news" className="hover:text-white/80">News &amp; Insights</Link> / {article.category}
                    </p>
                    <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">{article.title}</h1>
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/60">
                        <span
                            className="rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{ backgroundColor: "var(--color-ember-100)", color: "var(--color-ember-600)" }}
                        >
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            {formatDate(article.date)}
                        </span>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-16 lg:py-20">
                <div className="space-y-5">
                    {article.body.map((p, i) => (
                        <p key={i} className="text-base leading-relaxed text-ink-700">
                            {p}
                        </p>
                    ))}
                </div>

                <Link
                    to="/news"
                    className="mt-10 inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--color-ember-500)" }}
                >
                    <ArrowLeft size={15} />
                    Back to News &amp; Insights
                </Link>

                {related.length > 0 && (
                    <div className="mt-16 border-t border-mist-200 pt-10">
                        <h2 className="mb-6 font-display text-lg font-bold" style={{ color: "var(--color-ink-900)" }}>
                            More on {article.category}
                        </h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {related.map((r) => (
                                <Link
                                    key={r.slug}
                                    to={`/news/${r.slug}`}
                                    className="rounded-2xl border border-mist-200 p-5 transition-shadow hover:shadow-md"
                                >
                                    <p className="text-xs text-ink-500">{formatDate(r.date)}</p>
                                    <p className="mt-1.5 font-display text-sm font-bold" style={{ color: "var(--color-ink-900)" }}>
                                        {r.title}
                                    </p>
                                    <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{r.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <CTABand />
        </>
    );
}
