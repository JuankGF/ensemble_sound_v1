import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const mediaRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.media.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getByPath: publicProcedure
    .input(
      z.object({
        path: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.media.findUnique({
        where: {
          path: input.path,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        path: z.string(),
        extension: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.media.create({
        data: {
          name: input.name,
          path: input.path,
          extension: input.extension,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.media.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.media.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
