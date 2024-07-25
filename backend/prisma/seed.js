const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  // Generate fake cafes
  for (let i = 0; i < 5; i++) {
    const cafe = await prisma.cafe.create({
      data: {
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        logo: faker.image.url(),
        location: faker.location.city(),
      },
    });

    // Generate fake employees for each cafe
    for (let j = 0; j < 10; j++) {
      await prisma.employee.create({
        data: {
          id: "UI" + faker.string.alphanumeric(7),
          name: faker.person.fullName(),
          emailAddress: faker.internet.email(),
          phoneNumber:
            faker.string.numeric(1, { allowLeadingZeros: true }) +
            faker.string.numeric(7),
          gender: faker.helpers.arrayElement(["Male", "Female"]),
          startDate: faker.date.past(),
          cafeId: cafe.id,
        },
      });
    }
  }
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
