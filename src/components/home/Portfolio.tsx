import { useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiCode,
  FiPenTool,
  FiSearch,
  FiShare2,
  FiTarget,
  FiVideo,
  FiSmartphone,
} from "react-icons/fi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Category =
  | "Web Development"
  | "Mobile Development"
  | "SEO"
  | "Social Media"
  | "Graphic Design"
  | "Video Editing"
  | "Ads";

type Project = {
  title: string;
  category: Category;
  image?: string;
  href: string;
};

const categoryIcons: Record<Category, IconType> = {
  "Web Development": FiCode,
  "Mobile Development": FiSmartphone,
  SEO: FiSearch,
  "Social Media": FiShare2,
  "Graphic Design": FiPenTool,
  "Video Editing": FiVideo,
  Ads: FiTarget,
};

const projects: Project[] = [
  {
    title: "Nexora E-commerce Website",
    category: "Web Development",
    href: "/portfolio/nexora",
  },
  {
    title: "Mobile Banking Application",
    category: "Mobile Development",
    href: "/portfolio/mobile-banking",
  },
  {
    title: "Medico Plus Brand Identity",
    category: "Graphic Design",
    href: "/portfolio/medico-plus",
  },
  {
    title: "EduSpark Google Ranking Growth",
    category: "SEO",
    href: "/portfolio/eduspark",
  },
  {
    title: "Foodie Hub Facebook Campaign",
    category: "Ads",
    href: "/portfolio/foodie-hub",
  },
  {
    title: "TravelNest Instagram Reels",
    category: "Social Media",
    href: "/portfolio/travelnest",
  },
  {
    title: "Buildwell Promo Video",
    category: "Video Editing",
    href: "/portfolio/buildwell",
  },
];

const Portfolio = () => {
  const rootRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  const [active, setActive] = useState<Category | "All">("All");

  const categories = useMemo<(Category | "All")[]>(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );

  const visibleProjects =
    active === "All"
      ? projects
      : projects.filter((project) => project.category === active);

  // Initial Animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            once: true,
          },
        });

        tl.from("[data-title]", {
          y: 30,
          opacity: 0,
          duration: 0.7,
        })
          .from(
            "[data-description]",
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
            },
            "-=0.4",
          )
          .from(
            "[data-link]",
            {
              y: 20,
              opacity: 0,
              duration: 0.5,
            },
            "-=0.3",
          )
          .from(
            "[data-filter]",
            {
              y: 15,
              opacity: 0,
              duration: 0.4,
              stagger: 0.08,
            },
            "-=0.2",
          )
          .from(
            "[data-card]",
            {
              y: 35,
              opacity: 0,
              duration: 0.6,
              stagger: 0.12,
            },
            "-=0.1",
          );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // Filter Animation
  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

        if (!cards.length) return;

        gsap.fromTo(
          cards,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all",
          },
        );
      });

      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [active],
      revertOnUpdate: true,
    },
  );

  return (
    <section ref={rootRef} className="bg-brand-soft py-20 lg:py-28">
      <div className="wrapper">
        {/* Heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              data-title
              className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Our recent work
            </h2>

            <p
              data-description
              className="text-ink-soft mt-4 text-base leading-relaxed sm:text-lg"
            >
              A few projects we have delivered for businesses like yours.
            </p>
          </div>

          <a
            data-link
            href="/portfolio"
            className="text-brand hover:text-brand-dark group inline-flex items-center gap-2 text-[15px] font-semibold transition-colors"
          >
            View all projects
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Filter */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap gap-3"
        >
          {categories.map((category) => {
            const isActive = category === active;

            return (
              <button
                key={category}
                data-filter
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(category)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-brand text-paper"
                    : "bg-paper text-ink-soft hover:text-brand ring-1 ring-black/5"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, i) => {
            const Icon = categoryIcons[project.category];

            return (
              <a
                key={project.title}
                data-card
                href={project.href}
                className="group bg-paper focus-visible:outline-brand block overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-brand/15 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center text-6xl text-white/80 transition-transform duration-500 group-hover:scale-105 ${
                        i % 2 === 0
                          ? "bg-linear-to-br from-brand-dark to-brand"
                          : "bg-linear-to-br from-brand to-brand-light"
                      }`}
                    >
                      <Icon />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="bg-ink/50 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="bg-paper text-brand flex h-14 w-14 items-center justify-center rounded-full text-2xl">
                      <FiArrowUpRight />
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <span className="bg-brand-soft text-brand inline-block rounded-full px-3 py-1 text-xs font-semibold">
                    {project.category}
                  </span>

                  <h3 className="text-ink group-hover:text-brand mt-3 text-lg font-bold transition-colors">
                    {project.title}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
