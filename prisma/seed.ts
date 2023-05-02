import { type Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Eduardo Perez",
    email: "eddyensemble@gmail.com",
    phone: "+1305-609-6067",
    role: "ADMIN",
  },
];

const techRider: Prisma.EquipmentCreateInput[] = [
  {
    name: "PROD1",
    description: "Radial 2CH Passive Inst D.I",
    type: "DIRECT_INPUT",
    quantity: 1,
  },
  {
    name: "PROD2",
    description: "Radial 1CH Passive Inst D.I",
    type: "DIRECT_INPUT",
    quantity: 1,
  },
  {
    name: "IMP2",
    description: "WirlWind 1CH Passive Inst D.I",
    type: "DIRECT_INPUT",
    quantity: 1,
  },
  {
    name: "SHURE PSM300",
    description: "In Ear Monitor System Wireless",
    type: "MONITORS",
    quantity: 8,
  },
  {
    name: "DONER EM1",
    description: "In Ear Monitor System Wired",
    type: "MONITORS",
    quantity: 2,
  },
  {
    name: "SHURE SLX4",
    description: "SM58BETA SLX4 Wireless Mic",
    type: "MICROPHONES",
    quantity: 4,
  },
  {
    name: "E604",
    description: "Sennheiser Clip-On Snare-Tom Mic",
    type: "MICROPHONES",
    quantity: 4,
  },
  {
    name: "SHURE SM81",
    description: "Shure Cardioid 48V Inst Mic",
    type: "MICROPHONES",
    quantity: 3,
  },
  {
    name: "SHURE BETA52",
    description: "Shure Super Din Kick Drum Mic",
    type: "MICROPHONES",
    quantity: 1,
  },
  {
    name: "SHURE SM57",
    description: "Shure Dynamic Inst Mic",
    type: "MICROPHONES",
    quantity: 3,
  },
  {
    name: "SHURE SM58",
    description: "Shure Dynamic Vocal Mic",
    type: "MICROPHONES",
    quantity: 3,
  },
  {
    name: "TGD57C",
    description: "Beyerdinamic Clip GooseNeck Mic",
    type: "MICROPHONES",
    quantity: 3,
  },
  {
    name: "JBLPRX812W",
    description: "Powered Speaker Monitor",
    type: "MONITORS",
    quantity: 4,
  },
  {
    name: "M32LIVE MIDAS",
    description: "40-CH M Series Digital Mixer",
    type: "MIXERS",
    quantity: 1,
  },
  {
    name: "JBLSRX906LA",
    description: "Powered Array Speaker",
    type: "SPEAKERS",
    quantity: 4,
  },
  {
    name: "JBLSRX918S",
    description: "Powered Sub",
    type: "SUB",
    quantity: 2,
  },
  {
    name: "JBLPRX818XLFW",
    description: "Powered Sub",
    type: "SUB",
    quantity: 2,
  },
  {
    name: "MDL32",
    description: "MIDAS DL-32 32in/16out Stage Box",
    type: "STAGE_BOXES",
    quantity: 1,
  },
];

const serviceData: Prisma.ServiceCreateInput[] = [
  {
    name: "Live Event",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
    type: "LIVE_EVENT",
    estimatedPrice: 200,
    media: {
      create: {
        name: "live_event",
        extension: "jpeg",
        path: "/media/live_event.jpeg",
      },
    },
  },
  {
    name: "Concert",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
    type: "LIVE_EVENT",
    estimatedPrice: 800,
    media: {
      create: {
        name: "concert",
        extension: "jpeg",
        path: "/media/concert.jpeg",
      },
    },
  },
  {
    name: "Equipment Rental",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
    type: "RENTAL",
    estimatedPrice: 300,
    media: {
      create: {
        name: "rental",
        extension: "jpeg",
        path: "/media/rental.jpeg",
      },
    },
  },
  {
    name: "Recording",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
    type: "STUDIO",
    estimatedPrice: 250,
    media: {
      create: {
        name: "studio",
        extension: "jpeg",
        path: "/media/recording.jpeg",
      },
    },
  },
  {
    name: "Mixin",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
    type: "STUDIO",
    estimatedPrice: 600,
    media: {
      create: {
        name: "studio",
        extension: "jpeg",
        path: "/media/mixing.jpeg",
      },
    },
  },
  {
    name: "Sound Check",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed cursus.",
    type: "SOUND_TEST",
    estimatedPrice: 200,
    media: {
      create: {
        name: "sound_check",
        extension: "jpeg",
        path: "/media/sound_check.jpg",
      },
    },
  },
];

async function main() {
  // Prisma queries
  await prisma.equipment.deleteMany();
  await prisma.service.deleteMany();
  await prisma.media.deleteMany();

  console.log(`Start DB seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.upsert({
      where: { email: u.email ?? "" },
      update: {},
      create: { ...u },
    });
    if (user.name && user.email)
      console.log(`Created user ${user.name} with email: ${user.email}`);
  }
  for (const eq of techRider) {
    const equipment = await prisma.equipment.create({ data: eq });
    console.log(
      `Created equipment ${equipment.name} with quantity: ${equipment.quantity}`
    );
  }
  for (const s of serviceData) {
    const service = await prisma.service.create({ data: s });
    console.log(`Created service ${service.name} of type: ${service.type}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
