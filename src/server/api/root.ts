import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { serviceRouter } from "./routers/service";
import { equipmentRouter } from "./routers/equipment";
import { testimonialRouter } from "./routers/testimonial";
import { mediaRouter } from "./routers/media";
import { eventRouter } from "./routers/event";
import { mailerRouter } from "./routers/mailer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  services: serviceRouter,
  equipments: equipmentRouter,
  testimonials: testimonialRouter,
  medias: mediaRouter,
  events: eventRouter,
  mailer: mailerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
