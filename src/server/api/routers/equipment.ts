import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { EquipmentType } from "@prisma/client";

export const equipmentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.equipment.findMany({
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
        type: z.nativeEnum(EquipmentType),
        quantity: z.number(),
        weight: z.number(),
        dimensions: z.string(),
        media: z.object({
          name: z.string(),
          path: z.string(),
          extension: z.string(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.equipment.create({
        data: {
          name: input.name,
          description: input.description,
          type: input.type,
          quantity: input.quantity,
          weight: input.weight,
          dimension: input.dimensions,
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
        quantity: z.number(),
        weight: z.number(),
        dimensions: z.string(),
        media: z.object({
          name: z.string(),
          path: z.string(),
          extension: z.string(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.equipment.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          quantity: input.quantity,
          weight: input.weight,
          dimension: input.dimensions,
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

  /* setNextRentalDate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nextRentalDate: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.equipment.update({
        where: { id: input.id },
        data: {
          nextRentalDate: input.nextRentalDate,
          isRentalAvailable: datesDiffInDays(input.nextRentalDate) >= 1,
        },
      });
    }), */

  /* isRentalAvailable: protectedProcedure
    .input(
      z.object({
        equipmentId: z.string(),
        totalToRent: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.equipmentRental.findUnique({
        where: { equipmentId: input.id },
        select: {
          name: true,
          isRentalAvailable: true,
          nextRentalDate: true,
        },
      });
    }), */

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.equipment.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
