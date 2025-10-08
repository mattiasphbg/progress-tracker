import { Button } from "~/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="border-border bg-secondary text-secondary-foreground inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-accent relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              Now in Beta
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Track your progress.{" "}
              <span className="text-primary">Achieve your goals.</span>
            </h1>

            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty">
              The complete platform to visualize, track, and celebrate your
              journey. Set meaningful goals, monitor your progress in real-time,
              and stay motivated with insights that matter.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="gap-2">
                Start Tracking Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-transparent"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-muted-foreground text-sm">
                  Active Users
                </div>
              </div>
              <div className="bg-border h-12 w-px" />
              <div className="flex flex-col">
                <div className="text-2xl font-bold">1M+</div>
                <div className="text-muted-foreground text-sm">
                  Goals Achieved
                </div>
              </div>
              <div className="bg-border h-12 w-px" />
              <div className="flex flex-col">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-muted-foreground text-sm">User Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="from-primary/20 via-accent/20 to-primary/20 absolute -inset-4 rounded-3xl bg-gradient-to-br blur-3xl" />
            <div className="border-border bg-card relative rounded-2xl border p-8 shadow-2xl">
              <Image
                src="/progress-tracking-dashboard-with-charts-and-goal-c.jpg"
                alt="Progress tracking dashboard"
                width={600}
                height={600}
                className="rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
