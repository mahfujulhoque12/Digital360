import { useRef } from "react";
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

type Service = {
  title: string;
  description: string;
  icon: IconType;
  href: string;
};

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Fast, mobile-friendly websites and web apps that look great and turn visitors into customers.",
    icon: FiCode,
    href: "/services/web-development",
  },
  {
    title: "SEO",
    description:
      "Rank higher on Google with on-page, technical and content SEO that brings steady organic traffic.",
    icon: FiSearch,
    href: "/services/seo",
  },
  {
    title: "Social Media Marketing",
    description:
      "Grow your audience on Facebook, Instagram and LinkedIn with planned content and real engagement.",
    icon: FiShare2,
    href: "/services/social-media-marketing",
  },
  {
    title: "Graphic Design",
    description:
      "Logos, brand identity, banners and social posts designed to make your business stand out.",
    icon: FiPenTool,
    href: "/services/graphic-design",
  },
  {
    title: "Video Editing",
    description:
      "Reels, promo videos and ad creatives edited to hold attention and drive action.",
    icon: FiVideo,
    href: "/services/video-editing",
  },
  {
    title: "Google & Facebook Ads",
    description:
      "Targeted paid campaigns that reach the right people and give you a clear return on ad spend.",
    icon: FiTarget,
    href: "/services/ads",
  },
];

const Services = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Heading animation
        gsap.fromTo(
          "[data-head]",
          {
            y: 30,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-heading]",
              start: "top 85%",
              once: true,
            },
          },
        );

        // Cards animation
        gsap.fromTo(
          "[data-card]",
          {
            y: 40,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-grid]",
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    {
      scope: rootRef,
    },
  );

  return (
    <section
      id="services"
      ref={rootRef}
      className="bg-brand-soft scroll-mt-20 py-20 lg:py-28"
    >
      <div className="wrapper">
        {/* Heading */}
        <div
          data-heading
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <h2
              data-head
              className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
            >
              Everything your business needs to grow online
            </h2>

            <p
              data-head
              className="text-ink-soft mt-4 text-base leading-relaxed sm:text-lg"
            >
              One team for your website, marketing and creative work, so you
              don&apos;t have to manage many agencies.
            </p>
          </div>

          <a
            data-head
            href="/contact"
            className="text-brand hover:text-brand-dark group inline-flex items-center gap-2 text-[15px] font-semibold transition-colors"
          >
            Talk to our team
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Cards */}
        <div
          data-grid
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ title, description, icon: Icon, href }) => (
            <a
              key={title}
              data-card
              href={href}
              className="group bg-paper hover:bg-brand relative flex flex-col rounded-2xl p-7 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <span className="bg-brand-soft text-brand group-hover:text-brand flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition-colors duration-300 group-hover:bg-white">
                <Icon />
              </span>

              <h3 className="text-ink group-hover:text-paper mt-6 text-xl font-bold transition-colors duration-300">
                {title}
              </h3>

              <p className="text-ink-soft mt-3 flex-1 leading-relaxed transition-colors duration-300 group-hover:text-white/85">
                {description}
              </p>

              <span className="text-brand group-hover:text-paper mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300">
                Learn more
                <FiArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
