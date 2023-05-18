import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import * as trpc from "@trpc/server";

import { fallbackAvatar } from "~/utils/fallbackAvatar";

export const testimonialRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.testimonial.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  getAllByAuthor: publicProcedure
    .input(
      z.object({
        author: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.testimonial.findMany({
        where: {
          authorId: input.author,
        },
        orderBy: { rating: "desc" },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        count: z.number().optional(),
        distinct: z.enum(["authorId"]).optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.testimonial.findMany({
        take: input.count,
        distinct: input.distinct,
        include: { author: true },
        orderBy: { rating: "desc" },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        opinion: z.string(),
        rating: z.number(),
        authorName: z.string().optional(),
        authorImage: z.string().optional(),
        authorEmail: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.testimonial.create({
        data: {
          text: input.opinion,
          rating: input.rating,
          author: {
            connectOrCreate: {
              where: {
                email: input.authorEmail,
              },
              create: {
                name: input.authorName ?? input.authorEmail,
                email: input.authorEmail,
                image:
                  input.authorImage ??
                  fallbackAvatar(input.authorName ?? input.authorEmail),
              },
            },
          },
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        text: z.string().optional(),
        rating: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (input.rating && (input.rating > 5 || input.rating < 1)) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "rating must be a value between 1 and 5.",
          cause: "rating value out of bonds",
        });
      }
      return ctx.prisma.testimonial.update({
        where: {
          id: input.id,
        },
        data: {
          text: input.text,
          rating: input.rating,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.testimonial.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
