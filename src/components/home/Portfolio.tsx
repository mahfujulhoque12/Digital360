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
} from "react-icons/fi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Category =
  | "Web Development"
  | "SEO"
  | "Social Media"
  | "Graphic Design"
  | "Video Editing"
  | "Ads";

type Project = {
  title: string;
  category: Category;
  /** Real image er path (jemon "/projects/nexora.jpg"). Na dile gradient placeholder dekhabe */
  image?: string;
  href: string;
};

const categoryIcons: Record<Category, IconType> = {
  "Web Development": FiCode,
  SEO: FiSearch,
  "Social Media": FiShare2,
  "Graphic Design": FiPenTool,
  "Video Editing": FiVideo,
  Ads: FiTarget,
};

// TODO: Real project, image ar link diye replace korben
const projects: Project[] = [
  {
    title: "Nexora E-commerce Website",
    category: "Web Development",
    href: "/portfolio/nexora",
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
  const isFirstRender = useRef<boolean>(true);
  const [active, setActive] = useState<Category | "All">("All");

  const categories = useMemo<(Category | "All")[]>(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );

  const visibleProjects =
    active === "All"
      ? projects
      : projects.filter((project) => project.category === active);

  /* Scroll e ashle prothom bar reveal */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-head]", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-head]",
            start: "top 85%",
            once: true,
          },
        });

        ScrollTrigger.batch("[data-card]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.from(batch, {
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  /* Filter change hole card gulo notun kore animate hobe */
  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-card]",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [active] },
  );

  return (
    <section ref={rootRef} className="bg-brand-soft py-20 lg:py-28">
      <div className="wrapper">
        {/* Heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              data-head
              className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Our recent work
            </h2>
            <p
              data-head
              className="text-ink-soft mt-4 text-base leading-relaxed sm:text-lg"
            >
              A few projects we have delivered for businesses like yours.
            </p>
          </div>

          <a
            data-head
            href="/portfolio"
            className="text-brand hover:text-brand-dark group inline-flex items-center gap-2 text-[15px] font-semibold transition-colors"
          >
            View all projects
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Filter */}
        <div
          data-head
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap gap-3"
        >
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
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

                  {/* Hover overlay */}
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
