import { useRef } from "react";
import { type IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiCheck,
  FiLayers,
  FiShield,
  FiZap,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  icon: IconType;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: "Basic",
    description:
      "Perfect for individuals and small businesses getting started.",
    price: "Custom",
    period: "One-time",
    icon: FiZap,
    features: [
      "Up to 5 pages",
      "Responsive website design",
      "Modern UI/UX",
      "Basic SEO optimization",
      "Contact form integration",
      "Basic performance optimization",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Standard",
    description: "Everything you need to build a professional online presence.",
    price: "Custom",
    period: "One-time",
    icon: FiLayers,
    popular: true,
    features: [
      "Up to 10 pages",
      "Custom UI/UX design",
      "Frontend & backend development",
      "Database integration",
      "REST API development",
      "Advanced SEO optimization",
      "Performance optimization",
      "30 days of support",
    ],
    buttonText: "Choose Standard",
  },
  {
    name: "Premium",
    description: "A complete digital solution for growing businesses.",
    price: "Custom",
    period: "Let's discuss",
    icon: FiShield,
    features: [
      "Unlimited pages (scope-based)",
      "Fully custom UI/UX design",
      "Full-stack application development",
      "Advanced database architecture",
      "Third-party API integrations",
      "Authentication & authorization",
      "Advanced security optimization",
      "Deployment & configuration",
      "90 days of support",
    ],
    buttonText: "Go Premium",
  },
];

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        ".pricing-heading",
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
      ).fromTo(
        ".pricing-card",
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
        },
        "-=0.4",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative overflow-hidden bg-paper py-20 sm:py-28"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-brand-soft blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-brand-soft blur-3xl" />

      <div className="wrapper relative z-10">
        {/* Section Heading */}
        <div className="pricing-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
            <span className="h-2 w-2 rounded-full bg-brand" />
            Pricing & Packages
          </span>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Simple Plans.
            <span className="block text-brand">Powerful Solutions.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-ink-soft/70 sm:text-lg">
            Choose the right package for your business. Flexible solutions
            designed to turn your ideas into reality.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`pricing-card group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-2 sm:p-8 ${
                  plan.popular
                    ? "border-brand bg-ink text-paper shadow-[0_20px_60px_rgba(37,99,235,0.16)] lg:scale-105"
                    : "border-gray-200 bg-paper text-ink shadow-sm hover:border-brand/40 hover:shadow-xl"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    Most Popular
                  </span>
                )}

                {/* Plan Header */}
                <div className="mb-7">
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                      plan.popular
                        ? "bg-brand text-white"
                        : "bg-brand-soft text-brand"
                    }`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="text-2xl font-bold">{plan.name}</h3>

                  <p
                    className={`mt-3 min-h-[48px] text-sm leading-6 ${
                      plan.popular ? "text-gray-300" : "text-ink-soft/70"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div
                  className={`mb-7 border-b pb-7 ${
                    plan.popular ? "border-white/15" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>

                    <span
                      className={`mb-1 text-sm ${
                        plan.popular ? "text-gray-400" : "text-ink-soft/60"
                      }`}
                    >
                      / {plan.period}
                    </span>
                  </div>

                  <p
                    className={`mt-2 text-xs ${
                      plan.popular ? "text-gray-400" : "text-ink-soft/50"
                    }`}
                  >
                    Pricing depends on project requirements.
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <p
                    className={`mb-5 text-sm font-semibold ${
                      plan.popular ? "text-gray-200" : "text-ink"
                    }`}
                  >
                    What's included:
                  </p>

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            plan.popular
                              ? "bg-brand text-white"
                              : "bg-brand-soft text-brand"
                          }`}
                        >
                          <FiCheck size={13} strokeWidth={3} />
                        </span>

                        <span
                          className={
                            plan.popular ? "text-gray-300" : "text-ink-soft/80"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`mt-9 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-brand text-white hover:bg-brand-light"
                      : "border border-brand bg-white text-brand hover:bg-brand hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                  <FiArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-ink-soft/70">
            Need something different? Let's build a custom solution for you.
          </p>

          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-dark"
          >
            Discuss Your Project
            <FiArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
