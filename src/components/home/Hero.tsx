import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowRight, FiTrendingUp, FiSearch } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 80, suffix: "+", label: "Happy clients" },
  { value: 5, suffix: "+", label: "Years of experience" },
];

const barHeights: number[] = [38, 52, 44, 68, 60, 82, 96];

const Hero = () => {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion hole kono animation chalabe na
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* ---------- 1. Page load intro ---------- */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-line]", {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.12,
        })
          .from(
            "[data-fade]",
            { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 },
            "-=0.5",
          )
          .from("[data-card]", { y: 40, opacity: 0, duration: 0.9 }, "-=0.9")
          .from(
            "[data-bar]",
            {
              scaleY: 0,
              transformOrigin: "bottom",
              duration: 0.8,
              stagger: 0.06,
            },
            "-=0.5",
          )
          .from(
            "[data-chip]",
            {
              scale: 0.6,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.7)",
            },
            "-=0.4",
          );

        /* ---------- 2. Counter animation ---------- */
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 2,
            delay: 0.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.val));
            },
          });
        });

        /* ---------- 3. Floating chips (loop) ---------- */
        gsap.utils.toArray<HTMLElement>("[data-chip]").forEach((chip, i) => {
          gsap.to(chip, {
            y: i % 2 === 0 ? -10 : 10,
            duration: 2.2 + i * 0.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        /* ---------- 4. ScrollTrigger parallax ---------- */
        const scrollConfig: ScrollTrigger.Vars = {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };

        gsap.to("[data-blob='a']", {
          yPercent: 50,
          ease: "none",
          scrollTrigger: scrollConfig,
        });
        gsap.to("[data-blob='b']", {
          yPercent: -30,
          xPercent: 15,
          ease: "none",
          scrollTrigger: scrollConfig,
        });
        gsap.to("[data-grid]", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: scrollConfig,
        });
        gsap.to("[data-content]", {
          yPercent: -12,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: scrollConfig,
        });
        gsap.to("[data-visual]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: scrollConfig,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="bg-ink text-paper relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-16 lg:min-h-[calc(100svh-5rem)] lg:py-20"
    >
      {/* ---------- Background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          data-grid
          className="absolute -inset-x-0 -top-20 -bottom-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px]"
        />
        <div
          data-blob="a"
          className="bg-brand/40 absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-[120px]"
        />
        <div
          data-blob="b"
          className="bg-brand-light/25 absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full blur-[120px]"
        />
      </div>

      <div className="wrapper grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------- Left: Content ---------- */}
        <div data-content>
          <div
            data-fade
            className="border-brand-light/30 bg-brand/10 text-brand-light inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
          >
            <HiOutlineSparkles />
            Full-service digital agency
          </div>

          <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
            <span className="block overflow-hidden pb-1">
              <span data-line className="block">
                We build brands
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span data-line className="text-brand-light block">
                that grow online.
              </span>
            </span>
          </h1>

          <p
            data-fade
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            At Digital 360 Solutions helps your business get more customers with
            websites, SEO, social media and ads that are built to bring real
            results.
          </p>

          <div data-fade className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/contact"
              className="bg-brand hover:bg-brand-dark text-paper group inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-[15px] font-semibold transition-colors"
            >
              Get Started
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="hover:border-brand-light hover:text-brand-light inline-flex items-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-[15px] font-semibold transition-colors"
            >
              Our Services
            </a>
          </div>

          {/* Stats */}
          <dl
            data-fade
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-bold">
                  <span data-count={stat.value}>0</span>
                  <span className="text-brand-light">{stat.suffix}</span>
                </dd>
                <p className="mt-1 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------- Right: Visual ---------- */}
        <div
          data-visual
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Main card */}
          <div
            data-card
            className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">
                  Monthly website visitors
                </p>
                <p className="mt-1 text-3xl font-bold">24,860</p>
              </div>
              <span className="bg-brand/20 text-brand-light inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold">
                <FiTrendingUp />
                +128%
              </span>
            </div>

            <div className="mt-8 flex h-44 items-end gap-3 sm:h-52">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  data-bar
                  style={{ height: `${h}%` }}
                  className={`flex-1 rounded-t-md ${
                    i === barHeights.length - 1
                      ? "bg-brand"
                      : "bg-brand-light/30"
                  }`}
                />
              ))}
            </div>

            <div className="mt-3 flex justify-between text-xs text-white/40">
              <span>Jan</span>
              <span>Jul</span>
            </div>
          </div>

          {/* Floating chips */}
          <div
            data-chip
            className="bg-paper text-ink absolute -top-5 -left-3 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl sm:-left-8"
          >
            <span className="bg-brand-soft text-brand flex h-9 w-9 items-center justify-center rounded-lg">
              <FiSearch />
            </span>
            <div>
              <p className="text-xs text-ink-soft">Google ranking</p>
              <p className="text-sm font-bold">Page 1 in 60 days</p>
            </div>
          </div>

          <div
            data-chip
            className="bg-brand text-paper absolute -right-3 -bottom-6 rounded-xl px-5 py-3 shadow-xl sm:-right-6"
          >
            <p className="text-xs text-white/80">Ad return</p>
            <p className="text-xl font-bold">4.2x ROI</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
