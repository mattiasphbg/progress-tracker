import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Set Your Goals",
    description:
      "Define what you want to achieve with clear, measurable objectives.",
  },
  {
    number: "02",
    title: "Track Progress Daily",
    description:
      "Log your activities and watch your progress grow in real-time.",
  },
  {
    number: "03",
    title: "Analyze & Improve",
    description: "Review insights and adjust your approach for better results.",
  },
  {
    number: "04",
    title: "Celebrate Success",
    description:
      "Reach milestones, earn achievements, and build lasting habits.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <div className="border-border bg-secondary inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Start achieving in{" "}
            <span className="text-primary">four simple steps</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="from-accent/20 via-primary/20 to-accent/20 absolute -inset-4 rounded-3xl bg-gradient-to-br blur-3xl" />
            <div className="border-border bg-card relative rounded-2xl border p-6 shadow-2xl">
              <Image
                src="/goal-tracking-interface-with-progress-bars-and-mil.jpg"
                alt="How it works"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="order-1 flex flex-col gap-8 lg:order-2">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold">
                  {step.number}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
