// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `progress-tracker_${name}`);

// export const posts = createTable(
//   "posts",
//   (d) => ({
//     id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
//     name: d.varchar({ length: 256 }),
//     createdAt: d
//       .timestamp({ withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
//   }),
//   (t) => [index("name_idx").on(t.name)],
// );

export const goals = createTable(
  "goals",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    clerkUserId: d.varchar({ length: 256 }).notNull(),
    name: d.varchar({ length: 256 }),
    description: d.text(),
    startDate: d.timestamp().notNull(),
    targetDate: d.timestamp().notNull(),
    status: d.varchar({ length: 256 }).notNull(),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("name_idx").on(t.name),
    index("goals_clerkUserId_idx").on(t.clerkUserId),
    index("goals_status_idx").on(t.status),
  ],
);

export const metrics = createTable("metrics", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  goalId: d.integer("goal_id").references(() => goals.id),
  name: d.varchar({ length: 100 }).notNull(),
  unit: d.varchar({ length: 50 }).notNull(),
  targetValue: d.numeric(),
  isCumulative: d.boolean().notNull().default(false),
}));

export const progressLogs = createTable("progress_logs", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  metricId: d.integer("metric_id").references(() => metrics.id),
  logDate: d.timestamp().notNull(),
  value: d.numeric().notNull(),
  notes: d.text(),
}));
