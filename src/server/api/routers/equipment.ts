import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { EquipmentType } from "@prisma/client";
import * as trpc from "@trpc/server";

import { datesDiffInDays } from "~/utils/datesDiffInDays";

export const equipmentRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        type: z.nativeEnum(EquipmentType).optional(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.equipment.findMany({
        where: {
          type: input.type,
        },
        orderBy: {
          type: "desc",
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
      return ctx.prisma.equipment.create({
        data: {
          name: input.name,
          description: input.description,
          type: input.type,
          quantity: input.quantity,
          weight: input.weight,
          dimension: input.dimensions,
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
        quantity: z.number().optional(),
        weight: z.number().optional(),
        dimensions: z.string().optional(),
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
      return ctx.prisma.equipment.delete({
        where: {
          id: input.id,
        },
      });
    }),

  rentEquipment: protectedProcedure
    .input(
      z.object({
        equipmentId: z.string(),
        rentalDate: z.date(),
        toRentQuantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const equipmentQty = await ctx.prisma.equipment.findFirst({
        where: {
          id: input.equipmentId,
          AND: {
            quantity: { gte: input.toRentQuantity },
          },
        },
        select: {
          quantity: true,
          inRentQuantity: true,
        },
      });

      if (
        equipmentQty &&
        equipmentQty.quantity - (equipmentQty.inRentQuantity ?? 0) >=
          input.toRentQuantity
      ) {
        throw new trpc.TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "The quantiy of equipments to rent exceds the available quantity.",
          cause: "Rent quantity exceds available quantity",
        });
      }

      return ctx.prisma.equipment.update({
        where: {
          id: input.equipmentId,
        },
        data: {
          nextRentalDate: input.rentalDate,
          inRentQuantity: input.toRentQuantity,
        },
      });
    }),

  isRentalAvailable: protectedProcedure
    .input(
      z.object({
        equipmentId: z.string(),
        rentalDate: z.date(),
      })
    )
    .query(async ({ ctx, input }) => {
      await ctx.prisma.equipment
        .findUnique({
          where: { id: input.equipmentId },
          select: {
            name: true,
            nextRentalDate: true,
          },
        })
        .then((response) => {
          return (
            (response && !response.nextRentalDate) ||
            (response?.nextRentalDate !== null &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              datesDiffInDays(input.rentalDate, response?.nextRentalDate) > 1)
          );
        })
        .catch(() => false);
    }),
});
