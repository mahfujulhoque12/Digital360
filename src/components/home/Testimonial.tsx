"use client";

import { useMemo, useRef } from "react";
import {
  FiArrowUpRight,
  FiMessageSquare,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Review {
  name: string;
  role: string;
  company: string;
  initials: string;
  review: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Alex Morgan",
    role: "Founder",
    company: "Digital Startup",
    initials: "AM",
    rating: 5,
    review:
      "Excellent work from start to finish. The website looks amazing, performs smoothly, and everything was delivered exactly as expected.",
  },
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    company: "Creative Studio",
    initials: "SJ",
    rating: 5,
    review:
      "Really impressed with the quality and attention to detail. Communication was smooth, and the final product exceeded my expectations.",
  },
  {
    name: "David Wilson",
    role: "CEO",
    company: "Tech Solutions",
    initials: "DW",
    rating: 5,
    review:
      "Professional, reliable, and technically strong. The entire development process was smooth, and I would definitely recommend working together.",
  },
];

const Testimonial = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Embla Autoplay
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplay],
  );

  // GSAP Animation
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
        ".testimonial-heading",
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
        ".testimonial-slider",
        {
          y: 55,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.35",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-brand-soft/40 py-24 sm:py-28"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-40 top-10 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />

      <div className="wrapper relative z-10">
        {/* Heading */}
        <div className="testimonial-heading mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-semibold text-brand">
            <FiMessageSquare size={15} />
            Client Testimonials
          </span>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            What People Say
            <span className="block text-brand">About My Work.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-ink-soft/70 sm:text-lg">
            Building great digital experiences is more than writing code. It's
            about creating value and lasting relationships.
          </p>
        </div>

        {/* Embla Slider */}
        <div className="testimonial-slider relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-6 flex touch-pan-y">
              {reviews.map((review, index) => (
                <div
                  key={review.name}
                  className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%]"
                >
                  <article className="group relative flex h-full min-h-[340px] flex-col rounded-2xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-xl sm:p-8">
                    {/* Rating & Quote */}
                    <div className="mb-7 flex items-center justify-between">
                      <div className="flex gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <FiStar
                            key={i}
                            size={17}
                            className="fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      <FaQuoteLeft
                        size={38}
                        className="text-brand/20 transition-colors duration-300 group-hover:text-brand/50"
                      />
                    </div>

                    {/* Review */}
                    <p className="flex-1 text-[15px] leading-7 text-ink-soft/80">
                      "{review.review}"
                    </p>

                    {/* Divider */}
                    <div className="my-7 h-px w-full bg-gray-100" />

                    {/* Client Information */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                        {review.initials}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-ink">
                          {review.name}
                        </h3>

                        <p className="mt-1 text-xs text-ink-soft/60">
                          {review.role} · {review.company}
                        </p>
                      </div>
                    </div>

                    {/* Card Number */}
                    <span className="absolute bottom-8 right-8 text-xs font-semibold tracking-widest text-gray-200">
                      0{index + 1}
                    </span>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand/20 bg-white text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
            >
              <FiChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brand/20 bg-white text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
            >
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <p className="text-sm text-ink-soft/70">
            Have a project in mind? Let's create something amazing together.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-brand-dark"
          >
            Let's Talk
            <FiArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
