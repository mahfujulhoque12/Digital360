import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiPenTool,
  FiShield,
  FiAward,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CoreValue {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const coreValues: CoreValue[] = [
  {
    number: "01",
    title: "Creativity",
    description:
      "We think beyond boundaries, combining imagination and strategy to create unique digital experiences that make brands stand out.",
    icon: <FiPenTool />,
  },
  {
    number: "02",
    title: "Integrity",
    description:
      "We believe in transparency, honesty, and accountability, building lasting relationships through trust and ethical practices.",
    icon: <FiShield />,
  },
  {
    number: "03",
    title: "Quality",
    description:
      "We never compromise on excellence. Every project is built with attention to detail, reliable engineering, and a commitment to high standards.",
    icon: <FiAward />,
  },
  {
    number: "04",
    title: "Innovation",
    description:
      "We embrace emerging technologies and forward-thinking solutions to help businesses stay competitive in an ever-changing digital world.",
    icon: <FiZap />,
  },
];

const CoreValues: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Header Animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Core Value Cards Animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 60,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-soft/30 py-24 lg:py-28"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-light/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />

      <div className="wrapper relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mx-auto mb-16 max-w-3xl text-center lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-light/30 bg-paper px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand shadow-sm">
            <FiAward className="h-4 w-4" />
            What Drives Us
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            The Values That <span className="text-brand">Define Us</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft/75 sm:text-lg">
            Our values shape every decision, every collaboration, and every
            solution we deliver. They define who we are and how we create
            lasting impact.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {coreValues.map((value) => (
            <div
              ref={cardsRef}
              key={value.number}
              className="group relative overflow-hidden rounded-2xl border border-brand-light/20 bg-paper p-7 shadow-lg shadow-brand-dark/5 transition-all duration-500 hover:-translate-y-2 hover:border-brand-light/50 hover:shadow-2xl hover:shadow-brand/10 sm:p-8"
            >
              {/* Top Gradient Line */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-brand to-brand-light transition-all duration-500 group-hover:w-full" />

              {/* Decorative Circle */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-soft/70 transition-transform duration-500 group-hover:scale-150" />

              {/* Number */}
              <div className="relative flex items-center justify-between">
                <span className="text-sm font-bold tracking-widest text-brand/50">
                  {value.number}
                </span>

                <FiArrowUpRight className="h-5 w-5 text-brand/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" />
              </div>

              {/* Icon */}
              <div className="relative mt-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-paper">
                <span className="text-3xl">{value.icon}</span>
              </div>

              {/* Content */}
              <div className="relative mt-7">
                <h3 className="text-xl font-bold text-ink transition-colors duration-300 group-hover:text-brand sm:text-2xl">
                  {value.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-ink-soft/75 sm:text-base">
                  {value.description}
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="mt-8 h-1 w-10 rounded-full bg-brand-light/40 transition-all duration-500 group-hover:w-20 group-hover:bg-brand" />
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 text-center">
          <p className="text-base font-medium text-ink-soft/70 sm:text-lg">
            Built on values. Driven by purpose.{" "}
            <span className="font-bold text-brand">
              Focused on your success.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
