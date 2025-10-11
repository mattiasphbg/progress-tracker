import { StatsOverview } from "~/app/_components/dashboard/stats-overview";
import { GoalsList } from "~/app/_components/dashboard/goals-list";
import { ProgressChart } from "~/app/_components/dashboard/progress-chart";
import { RecentActivity } from "~/app/_components/dashboard/recent-activity";
import { auth } from "@clerk/nextjs/server";

import { api } from "~/trpc/server";

export default async function DashboardPage() {
  const { userId } = await auth();

  const goals = await api.goals.getAll({ clerkUserId: userId ?? "" });
  return (
    <div className="bg-secondary/20 flex min-h-screen flex-col">
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Goals Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your progress and achieve your goals
            </p>
          </div>

          <StatsOverview />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <GoalsList goals={goals} clerkUserId={userId ?? ""} />
            </div>
            <div className="flex flex-col gap-6">
              <ProgressChart />
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
