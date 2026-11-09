import { useRef } from "react";

import { FiArrowRight, FiHome } from "react-icons/fi";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";

const ContactBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".about-breadcrumb", {
        y: 15,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".about-title",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3",
        )
        .from(
          ".about-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-brand-soft py-24 sm:py-28 lg:py-32"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-brand-light/15 blur-3xl" />

      <div className="wrapper">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="about-breadcrumb mb-6 flex items-center gap-2 rounded-full border border-brand/15 bg-white px-5 py-2.5 text-sm shadow-sm"
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 font-medium text-ink-soft transition-colors hover:text-brand"
            >
              <FiHome size={15} />
              Home
            </Link>

            <FiArrowRight className="text-gray-400" size={14} />

            <span className="font-semibold text-brand">Contact Us</span>
          </nav>

          {/* Title */}
          <h1 className="about-title text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Contact <span className="text-brand">Us</span>
          </h1>

          {/* Description */}
          <p className="about-description mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Digital360 Solutions is a full-service digital agency delivering
            premium web & mobile solutions, digital marketing, and growth
            strategies designed to elevate brands, engage audiences, and drive
            measurable business growth.
          </p>

          {/* Bottom Accent */}
          <div className="about-description mt-8 h-1.5 w-20 rounded-full bg-brand" />
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
