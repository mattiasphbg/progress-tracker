import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { goals, metrics } from "~/server/db/schema";

const createMetricSchema = z.object({
  goalId: z.number(),
  name: z.string().min(1, "Name is required").max(100),
  unit: z.string().min(1).max(50),
  targetValue: z.string().optional(),
  isCumulative: z.boolean().optional(),
});

const updateMetricSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  unit: z.string().min(1).max(50),
  targetValue: z.string().optional(),
  isCumulative: z.boolean().optional(),
});

export const metricsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ goalId: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.db
        .select()
        .from(metrics)
        .innerJoin(goals, eq(metrics.goalId, goals.id))
        .where(
          and(eq(metrics.goalId, input.goalId), eq(goals.clerkUserId, userId)),
        );
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.db
        .select()
        .from(metrics)
        .innerJoin(goals, eq(metrics.goalId, goals.id))
        .where(and(eq(metrics.id, input.id), eq(goals.clerkUserId, userId)));
    }),
  create: publicProcedure
    .input(createMetricSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.db.insert(metrics).values({
        goalId: input.goalId,
        name: input.name,
        unit: input.unit,
        targetValue: input.targetValue,
        isCumulative: input.isCumulative ?? false,
      });
    }),
  update: publicProcedure
    .input(updateMetricSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const metric = await ctx.db
        .select()
        .from(metrics)
        .innerJoin(goals, eq(metrics.goalId, goals.id))
        .where(and(eq(metrics.id, input.id), eq(goals.clerkUserId, userId)));

      if (metric.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return await ctx.db
        .update(metrics)
        .set(input)
        .where(eq(metrics.id, input.id));
    }),
});
