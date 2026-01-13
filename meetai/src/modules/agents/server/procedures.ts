import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { agentInsertSchema } from "../schemas";
import z from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new TRPCError({ code: "BAD_REQUEST" });
    return data;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({ ...getTableColumns(agents), meetingCount: sql<number>`5` })
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdAgent;
    }),
});
