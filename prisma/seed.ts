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
    name: "",
    desciption: "",
    type: "LIVE_EVENT",
    media: {
      create: {
        name: "",
        extension: "",
        path: "",
      },
    },
  },
];

async function main() {
  // Prisma queries
  await prisma.equipment.deleteMany();

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
