import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { ServiceType } from "@prisma/client";

export const serviceRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        count: z.number().optional(),
        distinct: z.enum(["type"]).optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.service.findMany({
        include: {
          media: true,
        },
        take: input.count,
        distinct: input.distinct,
        orderBy: [{ name: "desc" }],
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

  getByType: publicProcedure
    .input(
      z.object({
        count: z.number().optional(),
        types: z.array(z.nativeEnum(ServiceType)).optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.service.findMany({
        where:
          !input.types || !input.types.length
            ? {}
            : {
                type: {
                  in: input.types,
                },
              },
        include: {
          media: true,
        },
        take: input.count,
        orderBy: [{ name: "desc" }],
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
          description: input.description,
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
        name: z.string().optional(),
        description: z.string().optional(),
        estimatedPrice: z.number().optional(),
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
      return ctx.prisma.service.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          estimatedPrice: input.estimatedPrice,
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
      return ctx.prisma.service.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
