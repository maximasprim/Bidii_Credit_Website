import Wandeto from "../assets/wandeto.jpg";

export type LoanProduct = {
  slug: string;
  name: string;
  tagline: string;
  rateFrom: string;
  termLabel: string;
  bullets: string[];
  maxAmount: string;
  features: string[];
  eligibility: string[];
  requirements: string[];
  process: string[];
  faqs: { q: string; a: string }[];
};

export const loanProducts: LoanProduct[] = [
  {
    slug: "sme-loans",
    name: "SME Loans",
    tagline: "Grow your business with fast, collateral-free working capital.",
    rateFrom: "Competitive rates",
    termLabel: "Flexible repayment terms",
    bullets: ["No collateral required", "Quick disbursement to M-Pesa", "Affordable, flexible repayment"],
    maxAmount: "KES 100,000",
    features: [
      "Borrow from KES 2,000 up to KES 100,000",
      "No collateral required",
      "Funds sent directly to your M-Pesa account",
      "Flexible repayment terms tailored to your cash flow",
    ],
    eligibility: [
      "Registered or licensed business",
      "At least 6 months of verifiable business income",
    ],
    requirements: [
      "6 months' business invoices as proof of income",
      "2 passport photos",
      "Latest utility bill (rent or electricity)",
    ],
    process: [
      "Call 0709 840 000 to start your application",
      "Visit your nearest Bidii Credit branch",
      "Or apply online (coming soon)",
      "Funds disbursed and repaid via M-Pesa or bank account",
    ],
    faqs: [
      { q: "Do I need collateral for an SME loan?", a: "No - SME Loans are unsecured, so you can access funds without risking any business or personal assets." },
      { q: "How is the loan disbursed?", a: "Approved funds are sent directly to your M-Pesa account for convenience and security." },
    ],
  },
  {
    slug: "mobile-loans",
    name: "Mobile Loans",
    tagline: "Instant cash to your phone, no paperwork, no queues.",
    rateFrom: "Competitive rates",
    termLabel: "Short-term, repaid on your schedule",
    bullets: ["100% paperless application via app", "24/7 access, borrow anytime", "Instant M-Pesa disbursement"],
    maxAmount: "KES 50,000",
    features: [
      "Borrow up to KES 50,000 straight to your phone",
      "100% paperless - apply via the Bidii Credit App",
      "24/7 access to borrow anytime, anywhere",
      "Funds sent instantly via M-Pesa",
    ],
    eligibility: [
      "Kenyan resident with a valid national ID",
      "Active M-Pesa account",
    ],
    requirements: [
      "Download the Bidii Credit App (available on the Play Store)",
      "Valid national ID for sign-up",
    ],
    process: [
      "Download the Bidii Credit App from the Play Store",
      "Sign up and apply - takes under 5 minutes",
      "Receive funds directly to M-Pesa",
      "No app? Call 0709 840 000 for assistance",
    ],
    faqs: [
      { q: "Do I need to visit a branch for a mobile loan?", a: "No - the entire process, from application to disbursement, happens on the Bidii Credit App." },
      { q: "How fast is approval?", a: "Approval is instant, making mobile loans ideal for emergencies such as school fees or urgent bills." },
    ],
  },
  {
    slug: "logbook-loans",
    name: "Logbook Loans",
    tagline: "Unlock cash fast using your vehicle, while you keep driving it.",
    rateFrom: "Competitive rates",
    termLabel: "Flexible repayment terms",
    bullets: ["Keep driving your car", "Funds in hours, not days", "Borrow up to KES 5,000,000"],
    maxAmount: "KES 5,000,000",
    features: [
      "Borrow up to KES 5,000,000 against your vehicle's logbook",
      "Keep driving your car throughout the loan term",
      "Competitive, affordable repayment rates",
      "Quick processing, with funds available in hours",
    ],
    eligibility: [
      "Business owners registered or licensed for 1+ years, or",
      "Salaried employees employed for 1+ years",
    ],
    requirements: [
      "6 months' payslips and employment contract, or 6 months' business invoices",
      "Original logbook (in your name or your guarantor's name)",
      "Valid comprehensive insurance",
      "Motor vehicle valuation report",
      "2 passport photos",
      "6 months' bank statements",
      "Signed post-dated cheques",
    ],
    process: [
      "Call 0709 840 000 to start your application",
      "Visit your nearest branch",
      "Fill in the online form and we'll call you back",
      "Vehicle valuation and document verification",
      "Funds disbursed while you keep the vehicle",
    ],
    faqs: [
      { q: "Will I lose access to my car during the loan?", a: "No - you keep full use of your vehicle. Only the logbook is held as security until the loan is settled." },
      { q: "Are there any extra charges?", a: "Legal and valuation charges apply, and these are communicated upfront with no hidden fees." },
    ],
  },
  {
    slug: "rental-income-loans",
    name: "Rental Income Loans",
    tagline: "Leverage your rental income to fund repairs, emergencies, or growth.",
    rateFrom: "Competitive rates",
    termLabel: "Repayment aligned with your rental income",
    bullets: ["Borrow from KES 80,000 up to 5,000,000", "Repayment aligned with rental income", "No risk to your property"],
    maxAmount: "KES 5,000,000",
    features: [
      "Borrow between KES 80,000 and KES 5,000,000 against rental income",
      "Fast access to cash for repairs and emergencies",
      "Flexible repayment aligned with your rental income cycle",
      "Keep full ownership of your property",
    ],
    eligibility: [
      "Kenyan citizen aged 18 and above",
      "Proof of rental property ownership",
      "6 months of consistent rental income via bank or M-Pesa statements",
      "Property agent managing rentals for 6+ months",
      "Property located within Bidii Credit's area of operation",
    ],
    requirements: [
      "Proof of rental property ownership",
      "6 months' rental income statements (bank or M-Pesa)",
    ],
    process: [
      "Call 0709 840 000 to start your application",
      "Visit your nearest branch",
      "Fill in the online form - we'll call you back within 24 hours",
    ],
    faqs: [
      { q: "What can I use a rental income loan for?", a: "Common uses include property repairs, renovations to boost rental value, and covering unexpected expenses." },
      { q: "Does my property need to be in a specific area?", a: "Yes - the property must be within Bidii Credit's area of operation, where a branch is present." },
    ],
  },
  {
    slug: "check-off-loans",
    name: "Check Off Loans",
    tagline: "Low-interest loans deducted directly from your salary, for government employees.",
    rateFrom: "From 2% monthly",
    termLabel: "3–120 months",
    bullets: ["Approval in 6 hours", "Funds within 24 hours", "No collateral required"],
    maxAmount: "Based on salary and repayment capacity",
    features: [
      "Loan repayments deducted directly from your salary",
      "No collateral required",
      "Rates from 2% monthly interest",
      "Flexible repayment terms from 3 to 120 months",
    ],
    eligibility: [
      "Government employees, including teachers, nurses, and NYS staff",
    ],
    requirements: [
      "Valid national ID",
      "Proof of government employment",
    ],
    process: [
      "Call 0709 840 000 to start your application",
      "Submit minimal paperwork for a simple application",
      "Approval within 6 hours",
      "Funds disbursed within 24 hours",
    ],
    faqs: [
      { q: "Who qualifies for a check off loan?", a: "Government employees such as teachers, nurses, and NYS staff, whose repayments can be deducted directly from salary." },
      { q: "How long can I take to repay?", a: "Repayment terms are flexible, ranging from 3 to 120 months depending on the loan amount." },
    ],
  },
];

export const stats = [
  { label: "Disbursed to Kenyan businesses", value: 4.2, suffix: "B", prefix: "KES " },
  { label: "Loans processed", value: 38000, suffix: "+", prefix: "" },
  { label: "Average approval time", value: 6, suffix: "hrs", prefix: "" },
  { label: "Branches across Kenya", value: 12, suffix: "", prefix: "" },
];

export const testimonials = [
  {
    name: "Grace Wanjiru",
    role: "Owner, Wanjiru Fresh Produce, Kiambu",
    quote:
      "The loan let me buy a second delivery motorbike. My supply runs doubled and my customers stopped waiting.",
  },
  {
    name: "Samuel Otieno",
    role: "Boda Boda Operator, Kisumu",
    quote:
      "I financed my bike through the logbook option on an asset I didn't even own yet. Repayments match what I earn per week.",
  },
  {
    name: "Fatuma Abdi",
    role: "Retail Shop Owner, Eastleigh",
    quote:
      "Every other lender wanted collateral I didn't have. Bidii looked at my stock turnover instead and approved me in a day.",
  },
];

export const branches = [
  { name: "Head Office & Ngong Road", address: "Applewood Adams, Ngong Road", hours: "Mon–Fri 8:00–17:00, Sat 9:00–13:00", phone: "+254 709 840 000", lat: -1.2996122814777669, lng: 36.78084220779777 },
  { name: "Nairobi CBD", address: "Development House, Left Wing Room M13", hours: "Mon–Fri 8:00–17:00, Sat 9:00–13:00", phone: "+254 700 940 151", lat: -1.2881823762218805, lng: 36.82760680965088 },
  { name: "Kitengela", address: "Posta Building, Room 1", hours: "Mon–Fri 8:00–17:00", phone: "+254 715 429 199", lat: -1.5091567326433828, lng: 36.849996001144206 },
  { name: "Kawangware", address: "Nkrumah Seniors Park, 1st Floor", hours: "Mon–Fri 8:00–17:00", phone: "+254 725 270 600", lat: -1.2821434849125164, lng: 36.7524295673231 },
  { name: "Embakasi", address: "Donholm Near Naivas, East Gatemall Room 1", hours: "Mon–Fri 8:00–17:00", phone: "+254 746 512 894", lat: -1.2957683390792953, lng: 36.888847683165515 },
  { name: "Kajiado", address: "Hamadi House, 1st Floor Door 06", hours: "Mon–Fri 8:00–17:00", phone: "+254 706 618 461", lat: -1.8417311720383018, lng: 36.787296493787245 },
  { name: "Nakuru", address: "Ereto Plaza, !st Floor Room 2", hours: "Mon–Fri 8:00–17:00", phone: "+254 715 431 447", lat: -0.2828072126632219, lng: 36.07484082314101 },
  { name: "Machakos", address: "Universal Traders Sacco(UTS), Room TH003R", hours: "Mon–Fri 8:00–17:00", phone: "+254 715 431 447", lat: -1.5190841470447765, lng: 37.27060954352602 },
  { name: "Ruiru", address: "Gituamba Plaza, 2nd Floor Room K4", hours: "Mon–Fri 8:00–17:00", phone: "+254 708 492 346", lat: -1.146817218486526, lng: 36.958949266802314 },
  { name: "Thika", address: "Grace House, 2nd Floor Room 2", hours: "Mon–Fri 8:00–17:00", phone: "+254 113 331 843", lat: -1.2995908293256793, lng: 36.78148593796645 },
  { name: "Kasarani", address: "Lonak Business Center, Ground Floor HSE B5", hours: "Mon–Fri 8:00–17:00", phone: "+254 790 139 244", lat: -1.2181340233755387, lng: 36.89722759934476 },
  { name: "Karatina", address: "Cedar Plaza, 2nd Floor Room B08", hours: "Mon–Fri 8:00–17:00", phone: "+254 706 870 801", lat: -0.48100231573421115, lng: 37.12544541283505 },
];

export const faqs = [
  {
    q: "How fast can I get my loan disbursed?",
    a: "Most salary advances and emergency loans disburse within 2 hours of approval. Business and asset finance loans typically take 24-48 hours once documentation is verified.",
  },
  {
    q: "Do I need collateral?",
    a: "Not always. Business loans under KES 300,000 and salary advances are unsecured. Asset finance and logbook loans use the financed or pledged asset as security instead.",
  },
  {
    q: "Is Bidii Credit licensed?",
    a: "Yes. Bidii Credit is a licensed and regulated microfinance institution operating under Kenyan financial regulations, with published rates and no hidden charges.",
  },
  {
    q: "Can I repay early without penalties?",
    a: "Yes, early repayment is welcomed and does not attract a penalty on any of our standard loan products.",
  },
  {
    q: "What documents do I need to apply?",
    a: "A national ID, KRA PIN, and 3-6 months of M-Pesa or bank statements cover most applications. Business loans additionally require a business permit or registration certificate.",
  },
];

export const applicationSteps = [
  { step: 1, title: "Check eligibility", detail: "Answer five quick questions to see an instant indication of what you may qualify for." },
  { step: 2, title: "Submit application", detail: "Upload your ID, KRA PIN and statements. Most applicants finish in under 6 minutes." },
  { step: 3, title: "Verification call", detail: "A loan officer confirms your details, usually the same day you apply." },
  { step: 4, title: "Funds disbursed", detail: "Approved funds land in your M-Pesa or bank account, with your repayment schedule attached." },
];

export const coreValues = [
  { title: "Bidii - Diligence", detail: "We show up the way our borrowers do: consistently, and through the slow months as much as the good ones." },
  { title: "Transparency", detail: "Every offer states the full repayment before you sign. No revised figures after approval." },
  { title: "Access", detail: "Credit decisions look at real cash flow and character, not just collateral and paperwork." },
  { title: "Accountability", detail: "Licensed, audited, and answerable to our regulator and our members alike." },
];

export const timeline = [
  { year: "2012", event: "Founded in Nairobi as a small business lending circle serving Moi Avenue traders." },
  { year: "2015", event: "Licensed as a microfinance institution and opened branches in Kisumu and Mombasa." },
  { year: "2019", event: "Introduced asset finance and logbook loans to serve boda boda and SME operators." },
  { year: "2023", event: "Crossed KES 4 billion disbursed and expanded to 14 branches nationwide." },
];

export const leadership = [
  { name: "Geoffrey Wandeto", role: "Chairman", image: Wandeto },
  { name: "Rose Wachira", role: "Chief Executive Officer" },
  { name: "Julienne Njeri", role: "Chief Financial Officer" },
  { name: "Harrison Kingori", role: "General Manager" },
  // { name: "Anne Githio", role: "Customer Service Manager" },
];

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  detail: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "loan-processing",
    name: "Loan Processing",
    tagline: "From application to disbursement, handled by a named loan officer.",
    detail:
      "Every application is assigned to a loan officer who verifies your documents, explains any conditions in plain language, and follows it through to disbursement.",
    bullets: ["Dedicated loan officer per application", "Status updates by SMS at each stage", "Most decisions within 24–48 hours"],
  },
  {
    slug: "financial-advisory",
    name: "Financial Advisory",
    tagline: "Practical guidance on cash flow, borrowing capacity, and growth planning.",
    detail:
      "SME and business borrowers get complimentary advisory sessions covering cash flow planning, how much debt a business can safely carry, and preparing for larger facilities.",
    bullets: ["Free sessions for SME loan customers", "Cash flow and repayment capacity reviews", "Guidance on formalizing a business for bigger facilities"],
  },
  {
    slug: "savings-products",
    name: "Savings Products",
    tagline: "A savings account structured around loan top-ups and better future rates.",
    detail:
      "A linked savings product that builds a repayment history and unlocks preferential rates on future loans as balances and consistency grow.",
    bullets: ["No minimum opening balance", "Interest paid quarterly", "Consistent saving improves future loan terms"],
  },
  {
    slug: "insurance",
    name: "Somosure Insurance",
    tagline: "Asset and credit life cover bundled directly into loan repayments.",
    detail:
      "Asset finance and logbook loans include comprehensive cover for the financed item, and credit life cover protects your family from carrying the balance of a loan.",
    bullets: ["Asset cover bundled into asset finance and logbook loans", "Credit life cover on qualifying products", "Claims handled through a dedicated desk"],
  },
  {
    slug: "mobile-banking",
    name: "Mobile Banking Integration",
    tagline: "Apply, repay, and track your loan from M-Pesa or your bank app.",
    detail:
      "Repayments can be made directly through M-Pesa Paybill or bank standing order, with confirmations sent instantly and reflected in your account same-day.",
    bullets: ["M-Pesa Paybill repayment", "Bank standing order option", "Instant repayment confirmation by SMS"],
  },
  {
    slug: "digital-services",
    name: "Digital Services",
    tagline: "Apply, check status, and manage documents without visiting a branch.",
    detail:
      "Most of the loan journey - from eligibility checks to document upload and repayment tracking - can be completed online, with branches reserved for verification and cash services.",
    bullets: ["Fully online application for most products", "Document upload from your phone", "Digital repayment schedule and receipts"],
  },
];

export type DownloadCategory = "Application Forms" | "Product Brochures" | "Statements & Guides" | "Legal & Compliance";

export type DownloadItem = {
  title: string;
  category: DownloadCategory;
  fileType: "PDF" | "DOCX";
  size: string;
  description: string;
};
export type NewsCategory = "Financial Literacy" | "Product Updates" | "Company News" | "Customer Stories";

export type Article = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  excerpt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "reading-your-loan-offer",
    title: "How to Read a Loan Offer Before You Sign",
    category: "Financial Literacy",
    date: "2026-06-02",
    excerpt: "Four numbers to check on any loan offer before you accept it - not just the interest rate.",
    body: [
      "Most borrowers focus on the headline interest rate and stop there. The number that actually determines whether a loan is affordable is the monthly repayment against your income, not the rate on its own.",
      "Before signing anything, check four things: the total repayment amount, the monthly figure, whether the rate is flat or reducing balance, and whether there are charges outside the stated rate.",
      "A flat rate is calculated on the full original amount for the whole term, while a reducing balance rate is calculated only on what's still outstanding. Two loans with the same headline rate can cost very different amounts depending on which method is used.",
      "If any of these aren't stated clearly on the offer you're given, ask for them in writing before you accept.",
    ],
  },
  {
    slug: "collateral-vs-cash-flow-lending",
    title: "Why Some Lenders Look at Cash Flow Instead of Collateral",
    category: "Financial Literacy",
    date: "2026-05-14",
    excerpt: "Collateral-based lending excludes a lot of viable borrowers. Here's the alternative approach.",
    body: [
      "Traditional collateral-based lending asks one question: what can we repossess if this loan isn't repaid? That approach excludes many small business owners who have strong, consistent income but no asset large enough to pledge.",
      "Cash flow lending instead looks at the pattern of money moving through a business - M-Pesa statements, bank deposits, stock turnover - to judge whether a business can support a given repayment.",
      "This doesn't mean underwriting is looser; it means the underlying question changes from 'what do you own' to 'how does your business actually earn'.",
    ],
  },
  {
    slug: "bidii-crosses-4-billion",
    title: "Bidii Credit Crosses KES 4 Billion Disbursed",
    category: "Company News",
    date: "2026-04-28",
    excerpt: "A milestone eleven years in the making, and what it means for our branch expansion plans.",
    body: [
      "This year, Bidii Credit crossed KES 4 billion disbursed to Kenyan borrowers since our founding as a small lending circle on Moi Avenue in 2012.",
      "The milestone reflects growth across all six of our loan products, with asset finance and SME loans showing the fastest year-on-year growth as more registered businesses look to formalize their financing.",
      "We're using this momentum to fund two additional branch openings planned for later this year, extending coverage to underserved towns outside our current 14 branches.",
    ],
  },
  {
    slug: "salary-advance-limit-increase",
    title: "Salary Advance Limits Increased for Verified Payroll Customers",
    category: "Product Updates",
    date: "2026-04-10",
    excerpt: "Repeat borrowers with verified payroll now qualify for higher salary advance limits.",
    body: [
      "Starting this month, salary advance customers with at least three on-time repayments and verified payroll deposits qualify for increased limits, up from the previous KES 100,000 cap.",
      "The change reflects repayment data showing that consistent, verified-income borrowers rarely miss payments, and rewards that track record with more room the next time a shortfall comes up.",
      "Existing customers don't need to reapply - updated limits are visible the next time you check your eligibility.",
    ],
  },
  {
    slug: "grace-wanjiru-story",
    title: "How a Second Motorbike Changed Grace Wanjiru's Delivery Business",
    category: "Customer Stories",
    date: "2026-03-22",
    excerpt: "A Kiambu produce seller on what doubling her delivery capacity actually looked like in practice.",
    body: [
      "Grace Wanjiru has run Wanjiru Fresh Produce in Kiambu for six years. Her biggest bottleneck wasn't demand - it was getting stock from suppliers to customers fast enough before it spoiled.",
      "A business loan financed a second delivery motorbike, splitting her supply runs across two riders instead of one. Within two months, she was completing twice the deliveries per day without hiring additional staff.",
      "\"My customers stopped waiting,\" she says. \"That's the whole business, really - showing up on time.\"",
    ],
  },
  {
    slug: "logbook-loan-eligibility-update",
    title: "Logbook Loan Valuations Now Available at Nine Inspection Points",
    category: "Product Updates",
    date: "2026-03-05",
    excerpt: "Same-day vehicle valuation is now available at five additional partner locations nationwide.",
    body: [
      "Logbook loan applicants can now get a same-day vehicle valuation at nine partner inspection points across Nairobi, Mombasa, Kisumu, and Nakuru, up from four previously.",
      "The expansion cuts the average time between application and disbursement for logbook loans, since valuation was previously the longest step in the process for applicants outside Nairobi.",
    ],
  },
];

export const downloads: DownloadItem[] = [
  { title: "Business Loan Application Form", category: "Application Forms", fileType: "PDF", size: "240 KB", description: "The standard form for business loan applications, including the required guarantor section." },
  { title: "Asset Finance Application Form", category: "Application Forms", fileType: "PDF", size: "265 KB", description: "Application form for financing motorbikes, machinery, and commercial equipment." },
  { title: "SME Loan Application Pack", category: "Application Forms", fileType: "DOCX", size: "310 KB", description: "Full documentation pack for registered SME facilities, including financial statement templates." },
  { title: "Salary Advance Consent Form", category: "Application Forms", fileType: "PDF", size: "120 KB", description: "Payroll verification consent required for salary advance applications." },
  { title: "Business Loans Brochure", category: "Product Brochures", fileType: "PDF", size: "1.1 MB", description: "Rates, terms, and eligibility overview for the Business Loans product." },
  { title: "Asset Finance Brochure", category: "Product Brochures", fileType: "PDF", size: "980 KB", description: "How asset financing works, from valuation to ownership transfer." },
  { title: "Logbook Loans Brochure", category: "Product Brochures", fileType: "PDF", size: "890 KB", description: "Overview of logbook loan terms, valuation process, and top-up eligibility." },
  { title: "Sample Repayment Schedule", category: "Statements & Guides", fileType: "PDF", size: "150 KB", description: "An example month-by-month repayment schedule for a 12-month business loan." },
  { title: "First-Time Borrower's Guide", category: "Statements & Guides", fileType: "PDF", size: "620 KB", description: "A short guide to preparing documents and understanding your offer before you apply." },
  { title: "Terms and Conditions", category: "Legal & Compliance", fileType: "PDF", size: "410 KB", description: "Standard terms and conditions governing all Bidii Credit loan products." },
  { title: "Data Privacy Policy", category: "Legal & Compliance", fileType: "PDF", size: "280 KB", description: "How customer data is collected, used, and protected." },
  { title: "Complaints Handling Procedure", category: "Legal & Compliance", fileType: "PDF", size: "195 KB", description: "How to raise a complaint and what response times to expect." },
];

export type JobOpening = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract";
  description: string;
};

export const jobOpenings: JobOpening[] = [
  {
    slug: "loan-officer-nairobi",
    title: "Loan Officer",
    department: "Credit",
    location: "Nairobi CBD",
    type: "Full-time",
    description: "Manage a portfolio of business and SME loan applications from intake through disbursement, including client verification visits.",
  },
  {
    slug: "credit-risk-analyst",
    title: "Credit Risk Analyst",
    department: "Risk & Compliance",
    location: "Nairobi CBD",
    type: "Full-time",
    description: "Support underwriting decisions with portfolio analysis and help refine eligibility models across our loan products.",
  },
  {
    slug: "branch-relationship-officer-kisumu",
    title: "Branch Relationship Officer",
    department: "Business Development",
    location: "Kisumu",
    type: "Full-time",
    description: "Grow the SME and business loan book in the Kisumu branch through direct outreach to local traders and business associations.",
  },
  {
    slug: "field-collections-associate",
    title: "Field Collections Associate",
    department: "Credit",
    location: "Mombasa",
    type: "Contract",
    description: "Support borrower follow-up and repayment recovery for the Mombasa branch, working closely with assigned loan officers.",
  },
  {
    slug: "digital-product-associate",
    title: "Digital Product Associate",
    department: "Technology",
    location: "Nairobi CBD",
    type: "Full-time",
    description: "Work on the online application flow and repayment tools, partnering with credit and operations to simplify the borrower journey.",
  },
];

export const benefits = [
  { title: "Medical cover", detail: "Comprehensive inpatient and outpatient cover for you and your dependents." },
  { title: "Performance bonus", detail: "Annual bonus tied to individual and branch performance." },
  { title: "Learning budget", detail: "Annual allowance for courses, certifications, and professional memberships." },
  { title: "Staff loan rates", detail: "Preferential rates on Bidii Credit products for all staff." },
];
