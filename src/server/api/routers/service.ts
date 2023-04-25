import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { ServiceType } from "@prisma/client";

export const serviceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.service.findMany({
      include: {
        media: true,
      },
    });
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.service.findUnique({
        where: {
          id: input.id,
        },
        include: {
          media: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        type: z.nativeEnum(ServiceType),
        estimatedPrice: z.number(),
        media: z.object({
          name: z.string(),
          path: z.string(),
          extension: z.string(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.create({
        data: {
          name: input.name,
          desciption: input.description,
          type: input.type,
          estimatedPrice: input.estimatedPrice,
          media: {
            create: {
              name: input.media.name,
              path: input.media.path,
              extension: input.media.extension,
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        estimatedPrice: z.number(),
        media: z.object({
          name: z.string(),
          path: z.string(),
          extension: z.string(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          desciption: input.description,
          estimatedPrice: input.estimatedPrice,
          media: {
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
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.service.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
