import { Card, CardContent } from "~/components/ui/card";
import {
  Target,
  TrendingUp,
  Award,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Goal Setting",
    description:
      "Create clear, actionable goals with customizable milestones and deadlines.",
  },
  {
    icon: TrendingUp,
    title: "Progress Visualization",
    description:
      "Beautiful charts and graphs that make your progress instantly clear.",
  },
  {
    icon: Award,
    title: "Achievement System",
    description:
      "Earn badges and celebrate milestones as you complete your goals.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Deep insights into your habits, patterns, and productivity trends.",
  },
  {
    icon: Calendar,
    title: "Daily Tracking",
    description:
      "Simple daily check-ins to maintain momentum and build consistency.",
  },
  {
    icon: Zap,
    title: "Smart Reminders",
    description:
      "Intelligent notifications that keep you on track without overwhelming you.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-secondary/30 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <div className="border-border bg-background inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Everything you need to <span className="text-primary">succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty">
            Powerful features designed to help you stay focused, motivated, and
            on track to achieve your most important goals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
