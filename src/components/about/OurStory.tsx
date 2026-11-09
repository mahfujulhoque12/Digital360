import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiFlag, FiTrendingUp, FiGlobe, FiArrowUpRight } from "react-icons/fi";
import { BsFillLightbulbFill } from "react-icons/bs";
import { AiFillRocket } from "react-icons/ai";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TimelineItem {
  year: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
}

const timeline: TimelineItem[] = [
  {
    year: "2021",
    label: "THE BEGINNING",
    title: "An Idea Takes Shape",
    description:
      "Every great journey starts with an idea. We began with a vision to help businesses embrace technology and create meaningful digital experiences.",
    icon: <BsFillLightbulbFill />,
    highlight: "The First Spark",
  },
  {
    year: "2022",
    label: "FOUNDATION",
    title: "Building Our Foundation",
    description:
      "We focused on developing our technical expertise, exploring emerging technologies, and building the foundation for delivering quality digital solutions.",
    icon: <FiFlag />,
    highlight: "Laying the Groundwork",
  },
  {
    year: "2023",
    label: "GROWTH",
    title: "Turning Ideas Into Reality",
    description:
      "Our journey evolved as we started transforming ideas into practical digital products, helping businesses solve real-world challenges through technology.",
    icon: <AiFillRocket />,
    highlight: "From Vision to Execution",
  },
  {
    year: "2024",
    label: "EXPANSION",
    title: "Expanding Our Capabilities",
    description:
      "We expanded our capabilities across web development, software engineering, digital marketing, and innovative technology solutions.",
    icon: <FiTrendingUp />,
    highlight: "Growing Our Impact",
  },
  {
    year: "2025",
    label: "INNOVATION",
    title: "A New Era of Digital Innovation",
    description:
      "With a stronger vision, we embraced modern technologies, intelligent automation, and scalable digital experiences to create greater value.",
    icon: <FiGlobe />,
    highlight: "Innovation Without Limits",
  },
  {
    year: "2026",
    label: "THE FUTURE",
    title: "Moving Forward, Together",
    description:
      "Today, we continue pushing boundaries, building meaningful partnerships, and helping businesses turn ambitious ideas into lasting digital success.",
    icon: <AiFillRocket />,
    highlight: "The Journey Continues",
  },
];

const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Header animation
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

      // Timeline progress line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 65%",
              end: "bottom 70%",
              scrub: 1,
            },
          },
        );
      }

      // Timeline cards animation
      if (timelineRef.current) {
        const items = gsap.utils.toArray<HTMLElement>(
          ".timeline-item",
          timelineRef.current,
        );

        items.forEach((item, index) => {
          const content = item.querySelector(".timeline-content");
          const isLeft = index % 2 === 0;

          gsap.from(content, {
            x: isLeft ? -60 : 60,
            y: 25,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
            },
          });

          const dot = item.querySelector(".timeline-dot");

          gsap.from(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
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
      className="relative overflow-hidden bg-brand/6 py-24 lg:py-28"
    >
      {/* Background Decorations */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-soft/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-40 h-96 w-96 rounded-full bg-brand-light/10 blur-3xl pointer-events-none" />

      <div className="wrapper relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-20 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-light/30 bg-brand-soft px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand">
            <FiFlag className="h-4 w-4" />
            Our Story
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Every Great Journey Has a{" "}
            <span className="text-brand">Beginning</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-ink-soft/75 sm:text-lg">
            From a simple vision to meaningful digital experiences, explore the
            milestones that have shaped our journey and continue to inspire our
            future.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          {/* Timeline Background Line */}
          <div className="absolute left-5 top-0 h-full w-0.5 -translate-x-1/2 bg-brand-light/20 md:left-1/2" />

          {/* Animated Progress Line */}
          <div
            ref={lineRef}
            className="absolute left-5 top-0 h-full w-0.5 origin-top -translate-x-1/2 bg-brand md:left-1/2"
          />

          <div className="space-y-12 md:space-y-20">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className="timeline-item relative grid grid-cols-1 md:grid-cols-2"
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot absolute left-5 top-7 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-paper bg-brand text-paper shadow-lg shadow-brand/20 md:left-1/2">
                    <span className="text-base">{item.icon}</span>
                  </div>

                  {/* Timeline Content */}
                  <div
                    className={`timeline-content ml-12 rounded-2xl border border-gray-100 bg-paper p-6 shadow-lg shadow-brand-dark/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-light/40 hover:shadow-xl sm:p-8 md:ml-0 ${
                      isLeft
                        ? "md:col-start-1 md:mr-16 md:text-right"
                        : "md:col-start-2 md:ml-16 md:mt-20"
                    }`}
                  >
                    {/* Year and Label */}
                    <div
                      className={`mb-5 flex flex-wrap items-center gap-3 ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      <span className="text-3xl font-extrabold tracking-tight text-brand">
                        {item.year}
                      </span>

                      <span className="rounded-full bg-brand-soft px-3 py-1 text-[10px] font-bold tracking-widest text-brand-dark">
                        {item.label}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-ink sm:text-2xl">
                      {item.title}
                    </h3>

                    <p className="text-sm leading-7 text-ink-soft/75 sm:text-base">
                      {item.description}
                    </p>

                    {/* Highlight */}
                    <div
                      className={`mt-6 flex items-center gap-2 text-sm font-semibold text-brand ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      <span>{item.highlight}</span>
                      <FiArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-brand-light/20 bg-brand-soft/50 px-6 py-10 sm:px-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-paper shadow-lg shadow-brand/20">
              <FiTrendingUp className="h-7 w-7" />
            </div>

            <h3 className="text-2xl font-bold text-ink sm:text-3xl">
              Our Story Is Still Being Written.
            </h3>

            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink-soft/75">
              The best chapters are ahead. Let's build something remarkable
              together.
            </p>

            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-paper transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20"
            >
              Let's Work Together
              <FiArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
