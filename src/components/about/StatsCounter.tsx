import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiBriefcase,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    id: 1,
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Digital solutions successfully delivered.",
    icon: <FiBriefcase />,
  },
  {
    id: 2,
    value: 35,
    suffix: "+",
    label: "Happy Clients",
    description: "Businesses growing with our expertise.",
    icon: <FiUsers />,
  },
  {
    id: 3,
    value: 12,
    suffix: "+",
    label: "Awards & Recognition",
    description: "Milestones that inspire us to do better.",
    icon: <FiAward />,
  },
];

const StatsCounter: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Header Animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Stats Cards Animation
      if (statsRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(
          ".stats-card",
          statsRef.current,
        );

        gsap.from(cards, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 82%",
            once: true,
          },
        });

        // Number Counter Animation
        cards.forEach((card) => {
          const counter = card.querySelector<HTMLElement>(".counter-value");

          if (!counter) return;

          const targetValue = Number(counter.dataset.value);

          const counterObject = { value: 0 };

          gsap.to(counterObject, {
            value: targetValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = Math.floor(
                counterObject.value,
              ).toLocaleString();
            },
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          });
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-dark py-20 lg:py-24"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-brand-light/10 blur-3xl" />

      <div className="wrapper relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-light">
            <FiTrendingUp className="h-4 w-4" />
            Our Achievements
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-paper sm:text-4xl lg:text-5xl">
            Numbers That{" "}
            <span className="text-brand-light">Tell Our Story</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-paper/65 sm:text-lg">
            Every number represents a partnership, a challenge overcome, and
            another step toward creating something extraordinary.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-8"
        >
          {stats.map((stat) => (
            <div className="stats-card">
              <div
                key={stat.id}
                className=" group relative overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.06] p-7 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand-light/40 hover:bg-paper/[0.10] hover:shadow-2xl hover:shadow-brand/10 sm:p-9"
              >
                {/* Decorative Circle */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand/10 transition-transform duration-500 group-hover:scale-150" />

                {/* Icon */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/15 text-brand-light transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-paper">
                  <span className="text-3xl">{stat.icon}</span>
                </div>

                {/* Counter */}
                <div className="relative mt-7 flex items-center justify-center">
                  <span
                    className="counter-value text-4xl font-extrabold tracking-tight text-paper sm:text-5xl lg:text-6xl"
                    data-value={stat.value}
                  >
                    0
                  </span>

                  <span className="ml-1 text-3xl font-bold text-brand-light sm:text-4xl">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="mt-4 text-lg font-bold text-paper sm:text-xl">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-paper/55">
                  {stat.description}
                </p>

                {/* Bottom Accent */}
                <div className="mx-auto mt-7 h-1 w-10 rounded-full bg-brand-light/50 transition-all duration-500 group-hover:w-20 group-hover:bg-brand-light" />

                <FiArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-paper/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-light" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium tracking-wide text-paper/50 sm:text-base">
            More than numbers — we build lasting digital partnerships.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
