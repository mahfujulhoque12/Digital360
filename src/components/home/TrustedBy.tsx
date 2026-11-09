import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

type Client = {
  name: string;
  /** Real logo er path dile image dekhabe, na dile name text dekhabe */
  logo?: string;
};

// TODO: Real client er name ar logo diye replace korben
const clients: Client[] = [
  { name: "Nexora" },
  { name: "Bluepeak" },
  { name: "Urban Cart" },
  { name: "Medico Plus" },
  { name: "EduSpark" },
  { name: "Foodie Hub" },
  { name: "TravelNest" },
  { name: "Buildwell" },
];

const TrustedBy = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  // Loop smooth rakhar jonno list duplicate kora hoyeche
  const slides: Client[] = [...clients, ...clients];

  return (
    <section
      aria-label="Our clients"
      className="border-brand-soft bg-paper border-b py-12 lg:py-16"
    >
      <div className="wrapper">
        <p className="text-ink-soft text-center text-base font-medium sm:text-lg">
          Trusted by <span className="text-brand font-bold">80+</span>{" "}
          businesses across Bangladesh and abroad
        </p>

        <div
          ref={emblaRef}
          className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          <div className="flex">
            {slides.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex min-w-0 flex-[0_0_auto] items-center justify-center px-8 sm:px-12"
              >
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    className="h-9 w-auto opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10"
                  />
                ) : (
                  <span className="text-ink-soft/50 hover:text-brand text-xl font-bold tracking-tight whitespace-nowrap transition-colors duration-300 select-none sm:text-2xl">
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
