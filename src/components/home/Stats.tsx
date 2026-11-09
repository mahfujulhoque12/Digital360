import { useRef } from "react";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiAward, FiBriefcase, FiSmile, FiUsers } from "react-icons/fi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: IconType;
};

// TODO: Apnar real number diye change korben
const stats: Stat[] = [
  { value: 250, suffix: "+", label: "Projects Done", icon: FiBriefcase },
  { value: 120, suffix: "+", label: "Happy Clients", icon: FiSmile },
  { value: 6, suffix: "+", label: "Years of Experience", icon: FiAward },
  { value: 25, suffix: "+", label: "Team Members", icon: FiUsers },
];

const Stats = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion hole animation hobe na, final number ta thakbe
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counters = gsap.utils.toArray<HTMLElement>("[data-count]");

        // Scroll er age 0 dekhabe
        counters.forEach((el) => {
          el.textContent = "0";
        });

        gsap.from("[data-stat]", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            once: true,
          },
        });

        counters.forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { val: 0 };

          gsap.to(counter, {
            val: target,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 80%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.val));
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="bg-brand text-paper relative isolate overflow-hidden py-16 lg:py-20"
    >
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-dark/60 absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-brand-light/30 absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl" />
      </div>

      <div className="wrapper">
        <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map(({ value, suffix, label, icon: Icon }) => (
            <div
              key={label}
              data-stat
              className="flex flex-col items-center text-center lg:border-l lg:border-white/20 lg:first:border-l-0"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl">
                <Icon />
              </span>

              <dd className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span data-count={value}>{value}</span>
                <span>{suffix}</span>
              </dd>

              <dt className="mt-2 px-2 text-sm font-medium text-white/80 sm:text-base">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Stats;
