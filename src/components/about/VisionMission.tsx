import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  FiTarget,
  FiEye,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CoreValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    icon: <FiZap className="w-6 h-6 text-brand" />,
    title: "Innovation First",
    description:
      "Pushing digital boundaries with cutting-edge tech and adaptive strategies.",
  },
  {
    icon: <FiTrendingUp className="w-6 h-6 text-brand" />,
    title: "Data-Driven Growth",
    description:
      "Every decision, design, and line of code is optimized for measurable ROI.",
  },
  {
    icon: <FiShield className="w-6 h-6 text-brand" />,
    title: "Uncompromising Quality",
    description:
      "Delivering enterprise-grade digital products designed to scale effortlessly.",
  },
  {
    icon: <FiAward className="w-6 h-6 text-brand" />,
    title: "Client Partnership",
    description:
      "We work as an extension of your team, dedicated to your long-term vision.",
  },
];

const VisionMission: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Header Animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Mission & Vision Cards Animation
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 70,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Core Values Animation
      if (valuesRef.current) {
        gsap.from(valuesRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Refresh ScrollTrigger after layout calculation
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    {
      scope: containerRef,
    },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 lg:py-32 bg-brand-soft/30 border-y border-brand-light/20 overflow-hidden relative"
    >
      {/* Decorative Background Shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="wrapper relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-paper text-brand border border-brand-light/30 shadow-sm">
            <FiTarget className="w-4 h-4" />
            Purpose & Direction
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mt-4">
            Driving Digital Transformation for{" "}
            <span className="text-brand">Global Brands</span>
          </h2>

          <p className="text-base sm:text-lg text-ink-soft/80 mt-4 leading-relaxed">
            At Digital360 Solutions, we bridge the gap between creative
            strategic thinking and high-impact digital execution.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div
            ref={cardsRef}
            className="group relative p-8 lg:p-10 rounded-2xl bg-paper border border-gray-100 shadow-xl shadow-brand-dark/5 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand to-brand-light" />

            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-brand-soft/60 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-soft transition-colors duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-brand-soft text-brand flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-brand group-hover:text-paper transition-all duration-300">
                  <FiTarget />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">
                  01 / MISSION
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-ink mb-4">
                Our Mission
              </h3>

              <p className="text-ink-soft leading-relaxed text-base sm:text-lg mb-6">
                To empower forward-thinking businesses with end-to-end digital
                solutions—combining scalable web & mobile engineering with
                high-ROI growth marketing to build market leaders.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center gap-2 text-brand font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>Explore Our Services</span>
              <FiArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative p-8 lg:p-10 rounded-2xl bg-brand-dark text-paper shadow-xl shadow-brand-dark/20 hover:shadow-2xl hover:shadow-brand-dark/30 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-light to-brand" />

            <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-brand/20 rounded-full blur-3xl pointer-events-none group-hover:bg-brand/30 transition-colors duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-paper/10 text-brand-light flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-brand-light group-hover:text-brand-dark transition-all duration-300">
                  <FiEye />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-paper/40">
                  02 / VISION
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-paper mb-4">
                Our Vision
              </h3>

              <p className="text-paper/80 leading-relaxed text-base sm:text-lg mb-6">
                To become the global benchmark for digital innovation—where
                technology meets human-centric design to transform ideas into
                sustainable digital legacies.
              </p>
            </div>

            <div className="pt-6 border-t border-paper/10 flex items-center gap-2 text-brand-light font-semibold group-hover:translate-x-2 transition-transform duration-300">
              <span>Join Our Journey</span>
              <FiArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-ink">
              Guided by Core Digital Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                ref={valuesRef}
                className="p-6 rounded-xl bg-paper border border-gray-100 hover:border-brand-light/40 hover:shadow-md transition-all duration-300 flex flex-col items-start shadow-sm"
              >
                <div className="p-3 rounded-lg bg-brand-soft mb-4">
                  {value.icon}
                </div>

                <h4 className="text-lg font-bold text-ink mb-2">
                  {value.title}
                </h4>

                <p className="text-sm text-ink-soft/75 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
