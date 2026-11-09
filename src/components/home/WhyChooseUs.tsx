import { useRef } from "react";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiDollarSign,
  FiHeadphones,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Feature = {
  title: string;
  description: string;
  icon: IconType;
};

// TODO: Apnar agency er real kotha diye change korben
const features: Feature[] = [
  {
    title: "Experienced Team",
    description:
      "Developers, designers and marketers with years of hands-on work for real businesses.",
    icon: FiUsers,
  },
  {
    title: "Affordable Pricing",
    description:
      "Clear packages with no hidden costs, built to fit startups and growing businesses.",
    icon: FiDollarSign,
  },
  {
    title: "24/7 Support",
    description:
      "Reach us anytime by phone, WhatsApp or email. We reply fast and fix issues quickly.",
    icon: FiHeadphones,
  },
  {
    title: "On-Time Delivery",
    description:
      "We agree on a timeline up front and stick to it, so your launch dates stay safe.",
    icon: FiClock,
  },
  {
    title: "Result-Driven Strategy",
    description:
      "Every plan starts with your goals, whether that is more leads, sales or brand reach.",
    icon: FiTrendingUp,
  },
  {
    title: "Transparent Reporting",
    description:
      "Simple monthly reports show what we did and what it delivered, in plain language.",
    icon: FiBarChart2,
  },
];

const WhyChooseUs = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-intro]", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-intro]",
            start: "top 85%",
            once: true,
          },
        });

        ScrollTrigger.batch("[data-feature]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.from(batch, {
              y: 40,
              opacity: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-paper py-20 lg:py-28">
      <div className="wrapper grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Left: intro (desktop e sticky) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            data-intro
            className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Why businesses choose Ace Digital 360
          </h2>
          <p
            data-intro
            className="text-ink-soft mt-5 max-w-md text-base leading-relaxed sm:text-lg"
          >
            We work like a part of your team. You get honest advice, fair
            pricing and work that is focused on growing your business.
          </p>

          <div data-intro className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="bg-brand hover:bg-brand-dark text-paper group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-semibold transition-colors"
            >
              Get a Free Quote
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/about"
              className="text-ink hover:text-brand text-[15px] font-semibold transition-colors"
            >
              About us
            </a>
          </div>
        </div>

        {/* Right: features */}
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              data-feature
              className="group border-brand-soft border-t-2 pt-6 transition-colors duration-300 hover:border-brand"
            >
              <span className="bg-brand-soft text-brand group-hover:bg-brand group-hover:text-paper flex h-12 w-12 items-center justify-center rounded-xl text-xl transition-colors duration-300">
                <Icon />
              </span>
              <h3 className="text-ink mt-5 text-lg font-bold">{title}</h3>
              <p className="text-ink-soft mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
