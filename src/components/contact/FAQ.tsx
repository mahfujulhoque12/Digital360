import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiChevronDown,
  FiHelpCircle,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "faq-1",
    category: "Services",
    question: "What services does Digital360 Solutions provide?",
    answer:
      "We offer custom web development, mobile app development (iOS & Android), UI/UX design, performance digital marketing, SEO, and full-stack cloud growth solutions tailored to your business goals.",
  },
  {
    id: "faq-2",
    category: "Process",
    question: "How long does a typical project take to complete?",
    answer:
      "Timelines depend on project scope and requirements. Standard corporate websites usually take 2 to 4 weeks, while custom enterprise web or mobile applications typically take 8 to 12 weeks.",
  },
  {
    id: "faq-3",
    category: "Services",
    question: "Do you provide support and maintenance after launch?",
    answer:
      "Yes, absolutely! Following project deployment, we offer continuous maintenance, security updates, feature scaling, and priority technical support packages to ensure long-term stability.",
  },
  {
    id: "faq-4",
    category: "Pricing",
    question: "What is your project budget structure and payment terms?",
    answer:
      "We follow a transparent milestone-based payment structure divided across project kick-off, milestone deliveries, and final handover. Exact cost breakdowns are provided after scope blueprint finalization.",
  },
  {
    id: "faq-5",
    category: "Process",
    question: "How can we track our project's progress?",
    answer:
      "We set up dedicated Slack/WhatsApp channels and project management boards (Jira/Trello). We provide weekly updates and scheduled video calls aligned with target milestones for complete transparency.",
  },
  {
    id: "faq-6",
    category: "Pricing",
    question: "Do you offer website or app audit and redesign services?",
    answer:
      "Yes, we provide detailed UI/UX audits, performance optimization, and codebase refactoring packages to modernize legacy systems and migrate them into high-converting digital platforms.",
  },
];

const categories = ["All", "Services", "Process", "Pricing"];

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>("faq-1");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Normal, smooth header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
          },
        });
      }

      // Normal FAQ list entrance
      if (listRef.current) {
        gsap.from(listRef.current.children, {
          y: 15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 90%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 bg-brand-soft/30 border-y border-brand-light/20 overflow-hidden relative"
    >
      {/* Soft Background Accent Shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="wrapper relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-paper text-brand border border-brand-light/30 shadow-sm">
            <FiHelpCircle className="w-4 h-4" /> Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mt-4">
            Frequently Asked <span className="text-brand">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-soft/80 mt-4 leading-relaxed">
            Got questions about our services, workflow, or client partnership?
            Here are clear answers to help you get started.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 cursor-pointer py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-brand text-paper border-brand shadow-md shadow-brand/20"
                  : "bg-paper text-ink-soft border-gray-200 hover:border-brand-light/50 hover:text-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List with 1fr / 0fr transition */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((item) => {
            const isOpen = activeId === item.id;

            return (
              <div
                ref={listRef}
                key={item.id}
                className={`rounded-2xl bg-paper border transition-all duration-300 shadow-sm overflow-hidden ${
                  isOpen
                    ? "border-brand-light/60 shadow-md ring-1 ring-brand-light/20"
                    : "border-gray-200 hover:border-brand-light/40"
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full cursor-pointer p-6 text-left flex items-center justify-between gap-4 focus:outline-none "
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold text-ink hover:text-brand transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-brand text-paper rotate-180"
                        : "bg-brand-soft text-brand"
                    }`}
                  >
                    <FiChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Smooth CSS Grid 1fr / 0fr Accordion Content */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-ink-soft/90 leading-relaxed text-base border-t border-gray-100/60 mt-1">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="max-w-3xl mx-auto mt-16 text-center bg-paper border border-brand-light/30 rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-brand-soft text-brand flex items-center justify-center text-xl shrink-0">
              <FiMessageSquare />
            </div>
            <div>
              <h4 className="text-lg font-bold text-ink">
                Have another question?
              </h4>
              <p className="text-sm text-ink-soft/80">
                Our team is ready to discuss your specific requirements.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand text-paper font-semibold text-sm hover:bg-brand-dark transition-all shadow-md shrink-0 group"
          >
            <span>Contact With Us</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
