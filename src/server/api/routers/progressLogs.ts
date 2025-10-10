import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { metrics, progressLogs, goals } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const createProgressLogSchema = z.object({
  metricId: z.number(),
  logDate: z.date(),
  value: z.string(),
  notes: z.string().optional(),
});

const updateProgressLogSchema = z.object({
  id: z.number(),
  logDate: z.date().optional(),
  value: z.string(),
  notes: z.string().optional(),
});

export const progressLogsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ metricId: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return await ctx.db
        .select()
        .from(progressLogs)
        .innerJoin(metrics, eq(progressLogs.metricId, metrics.id))
        .innerJoin(goals, eq(metrics.goalId, goals.id))
        .where(
          and(
            eq(progressLogs.metricId, input.metricId),
            eq(goals.clerkUserId, userId),
          ),
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
        .from(progressLogs)
        .innerJoin(metrics, eq(progressLogs.metricId, metrics.id))
        .innerJoin(goals, eq(metrics.goalId, goals.id))
        .where(
          and(eq(progressLogs.id, input.id), eq(goals.clerkUserId, userId)),
        );
    }),
  create: publicProcedure
    .input(createProgressLogSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Verify user owns the metric (and thus the goal)
      const metric = await ctx.db
        .select()
        .from(metrics)
        .innerJoin(goals, eq(metrics.goalId, goals.id))
        .where(
          and(eq(metrics.id, input.metricId), eq(goals.clerkUserId, userId)),
        );

      if (metric.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return await ctx.db.insert(progressLogs).values(input);
    }),
  update: publicProcedure
    .input(updateProgressLogSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Verify ownership through the chain
      const progressLog = await ctx.db
        .select()
        .from(progressLogs)
        .innerJoin(metrics, eq(progressLogs.metricId, metrics.id))
        .innerJoin(goals, eq(metrics.goalId, goals.id))
        .where(
          and(eq(progressLogs.id, input.id), eq(goals.clerkUserId, userId)),
        );

      if (progressLog.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return await ctx.db
        .update(progressLogs)
        .set(input)
        .where(eq(progressLogs.id, input.id));
    }),
});
