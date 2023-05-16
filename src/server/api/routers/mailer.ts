import { z } from "zod";
import { createTransport } from "nodemailer";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { type Request } from "@prisma/client";

import {
  adminHTML,
  adminTXT,
  clientHTML,
  clientTXT,
  template,
} from "~/server/mailer/templates";

type RequestData = Omit<Request, "id" | "createdAt" | "updatedAt">;

const mailConfig = {
  host: "smtp.gmail.com",
  port: 465, // or 587
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NEXT_PUBLIC_GMAIL_USER, // your gmail account
    pass: process.env.NEXT_PUBLIC_GMAIL_PASS, // your gmail app password
  },
} as SMTPTransport.Options;

const ADMIN_EMAIL = "Webmaster <juankgonzalezf@gmail.com>";

async function sendEmails({
  name,
  email,
  address,
  booking_date,
  description,
  phone,
  type,
}: RequestData) {
  // Create our Nodemailer transport handler
  const transporter = createTransport(mailConfig);

  // Format our recipient email address
  const recipEmail = `${name} <${email}>`;

  let sendHtml = template.replace("%BODY%", clientHTML).replace("%NAME%", name);

  let sendTxt = clientTXT.replace("%NAME%", name);

  //Send confirmation to user
  await transporter
    .sendMail({
      from: ADMIN_EMAIL,
      to: recipEmail, // list of receivers
      subject: "Message Received ✔", // Subject line
      text: sendTxt, // plain text body
      html: sendHtml, // html body
    })
    .then((info) => {
      console.log(info);
    });

  sendHtml = template
    .replace("%BODY%", adminHTML)
    .replace("%NAME%", name)
    .replaceAll("%EMAIL%", email)
    .replaceAll("%PHONE%", phone ?? "?")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .replace("%ADDRESS%", address)
    .replace("%BOOKING_DATE%", booking_date.toString())
    .replace("%TYPE%", type)
    .replace("%MESSAGE%", description);

  sendTxt = adminTXT
    .replace("%NAME%", name)
    .replaceAll("%EMAIL%", email)
    .replaceAll("%PHONE%", phone ?? "?")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .replace("%ADDRESS%", address)
    .replace("%BOOKING_DATE%", booking_date.toString())
    .replace("%TYPE%", type)
    .replace("%MESSAGE%", description);

  //Send message to admin
  await transporter
    .sendMail({
      from: recipEmail,
      to: ADMIN_EMAIL, // list of receivers
      subject: `New Request From Website user ${name} with email ${email} ✔`, // Subject line
      text: sendTxt, // plain text body
      html: sendHtml, // html body
    })
    .then((info) => {
      console.log(info);
    });
}

export const mailerRouter = createTRPCRouter({
  sendRequest: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        type: z.string(),
        booking_date: z.date().nullable(),
        description: z.string(),
        address: z.string(),
        phone: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await sendEmails({
        name: input.name,
        email: input.email,
        description: input.description,
        address: input.address,
        booking_date: input.booking_date ?? new Date(),
        type: input.type,
        phone: input.phone ?? null,
      })
        .then(() => {
          return ctx.prisma.request.create({
            data: {
              name: input.name,
              email: input.email,
              type: input.type,
              booking_date: input.booking_date ?? new Date(),
              description: input.description,
              address: input.address,
              phone: input.phone,
            },
          });
        })
        .catch(() => {
          return;
        });
    }),
});
