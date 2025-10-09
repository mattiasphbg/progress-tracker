import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

import { HeroSection } from "~/app/_components/homepage/hero-section";
import { FeaturesSection } from "~/app/_components/homepage/features-section";
import { HowItWorksSection } from "~/app/_components/homepage/how-it-works-section";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </HydrateClient>
  );
}
