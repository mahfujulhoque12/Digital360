"use client";

import { useRef } from "react";
import {
  FiArrowUpRight,
  FiMessageCircle,
  FiCode,
  FiLayers,
} from "react-icons/fi";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ".cta-content",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      )
        .fromTo(
          ".cta-button",
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          ".cta-decoration",
          {
            scale: 0.7,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=0.7",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-paper px-4 py-20 sm:px-6 sm:py-24">
      <div className="wrapper">
        <div className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24">
          {/* Background Decorations */}
          <div className="cta-decoration pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/15" />

          <div className="cta-decoration pointer-events-none absolute -right-8 -top-20 h-64 w-64 rounded-full border border-white/15" />

          <div className="cta-decoration pointer-events-none absolute -bottom-36 -left-20 h-80 w-80 rounded-full border border-white/15" />

          <div className="cta-decoration pointer-events-none absolute left-[12%] top-[15%] hidden text-white/20 sm:block">
            <FiCode size={48} />
          </div>

          <div className="cta-decoration pointer-events-none absolute bottom-[15%] right-[12%] hidden text-white/20 sm:block">
            <FiLayers size={45} />
          </div>

          {/* Content */}
          <div className="cta-content relative z-10 mx-auto max-w-3xl">
            {/* Badge */}
            <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-white backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-300" />
              Let's Work Together
            </span>

            {/* Heading */}
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
              Ready to Grow
              <span className="block text-blue-200">Your Business?</span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-blue-50/90 sm:text-base sm:leading-8">
              Have an idea or a project in mind? Let's turn your vision into a
              powerful digital experience that drives real results for your
              business.
            </p>

            {/* Buttons */}
            <div className="cta-button mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-bold text-brand shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 sm:w-auto"
              >
                <FiMessageCircle size={19} />
                Let's Discuss Your Project
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="#projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:w-auto"
              >
                Explore My Work
                <FiArrowUpRight size={18} />
              </a>
            </div>

            {/* Bottom Text */}
            <p className="mt-8 text-xs font-medium tracking-wide text-blue-100/70">
              Let's build something extraordinary together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
