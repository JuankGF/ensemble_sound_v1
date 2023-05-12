import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getAllPublic: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: {
        isPublic: true,
        date: {
          gte: new Date(),
        },
      },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: {
        date: { gte: new Date() },
      },
      select: {
        date: true,
        isPublic: true,
        isSynchronized: true,
        name: true,
      },
    });
  }),

  getAllPrivate: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: {
        isPublic: false,
      },
    });
  }),

  getByDate: publicProcedure
    .input(
      z.object({
        date: z.date(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findFirst({
        where: {
          date: { in: input.date },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        type: z.string(),
        date: z.date(),
        location: z.string(),
        address: z.string().optional(),
        isPublic: z.boolean().optional(),
        media: z
          .object({
            name: z.string(),
            path: z.string(),
            extension: z.string(),
          })
          .optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          name: input.name,
          description: input.description,
          type: input.type,
          date: input.date,
          address: input.address,
          location: input.location,
          isPublic: input.isPublic,
          media: input.media
            ? {
                create: {
                  name: input.media.name,
                  path: input.media.path,
                  extension: input.media.extension,
                },
              }
            : undefined,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        type: z.string().optional(),
        date: z.date().optional(),
        location: z.string().optional(),
        address: z.string().optional(),
        isPublic: z.boolean().optional(),
        media: z
          .object({
            name: z.string(),
            path: z.string(),
            extension: z.string(),
          })
          .optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          type: input.type,
          date: input.date,
          address: input.address,
          location: input.location,
          isPublic: input.isPublic,
          media: input.media
            ? {
                connectOrCreate: {
                  where: {
                    path: input.media.path,
                  },
                  create: {
                    name: input.media.name,
                    path: input.media.path,
                    extension: input.media.extension,
                  },
                },
              }
            : undefined,
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
