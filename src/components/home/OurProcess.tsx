import { useRef } from "react";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FiClipboard,
  FiCode,
  FiMessageCircle,
  FiPenTool,
  FiSend,
} from "react-icons/fi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Step = {
  title: string;
  description: string;
  icon: IconType;
};

// TODO: Apnar agency er process onujayi description change korben
const steps: Step[] = [
  {
    title: "Discuss",
    description:
      "We listen to your goals, audience and budget to understand what you really need.",
    icon: FiMessageCircle,
  },
  {
    title: "Plan",
    description:
      "We prepare a clear strategy, timeline and quote so you know every step ahead.",
    icon: FiClipboard,
  },
  {
    title: "Design",
    description:
      "Our designers create layouts and visuals. You review them and share feedback.",
    icon: FiPenTool,
  },
  {
    title: "Develop",
    description:
      "We build and test everything so it works fast on every phone and browser.",
    icon: FiCode,
  },
  {
    title: "Launch",
    description:
      "We go live, check everything once more and keep supporting you after launch.",
    icon: FiSend,
  },
];

const OurProcess = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop:
            "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
          };

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

          // Scroll korar sathe sathe line ta ankhe (desktop e left->right, mobile e top->bottom)
          gsap.fromTo(
            "[data-fill]",
            desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
            {
              scaleX: 1,
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-track]",
                start: "top 65%",
                end: "bottom 65%",
                scrub: true,
              },
            },
          );

          gsap.from("[data-step]", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-track]",
              start: "top 75%",
              once: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-paper py-20 lg:py-28">
      <div className="wrapper">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-head
            className="text-ink text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            How we work with you
          </h2>
          <p
            data-head
            className="text-ink-soft mt-4 text-base leading-relaxed sm:text-lg"
          >
            A simple 5 step process, so you always know what is happening and
            what comes next.
          </p>
        </div>

        {/* Steps */}
        <div data-track className="relative mt-16 lg:mt-20">
          {/* Line (background track) */}
          <div
            aria-hidden
            className="bg-brand-soft absolute top-7 bottom-16 left-[calc(1.75rem-1px)] w-0.5 lg:right-[calc(20%-1.75rem)] lg:bottom-auto lg:left-7 lg:h-0.5 lg:w-auto"
          >
            {/* Line (animated fill) */}
            <div
              data-fill
              className="bg-brand h-full w-full origin-top lg:origin-left"
            />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-8">
            {steps.map(({ title, description, icon: Icon }, i) => (
              <li
                key={title}
                data-step
                className="flex gap-6 lg:flex-col lg:gap-0"
              >
                <span className="bg-brand text-paper ring-paper relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl ring-8">
                  <Icon />
                </span>

                <div className="lg:mt-7">
                  <p className="text-brand text-sm font-semibold">
                    Step {i + 1}
                  </p>
                  <h3 className="text-ink mt-1 text-xl font-bold">{title}</h3>
                  <p className="text-ink-soft mt-2 leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
