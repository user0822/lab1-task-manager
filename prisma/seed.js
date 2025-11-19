import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Створюємо користувача
  const user = await prisma.user.create({
    data: {
      email: 'student@university.com',
      password: 'securepassword123', // У реальності тут має бути хеш
      name: 'Test Student',
      role: 'ADMIN',
    },
  });
  console.log(`👤 User created: ${user.name}`);

  // 2. Створюємо проєкт для цього користувача
  const project = await prisma.project.create({
    data: {
      title: 'Lab Work 1',
      description: 'Developing backend architecture',
      ownerId: user.id,
    },
  });
  console.log(`📂 Project created: ${project.title}`);

  // 3. Додаємо завдання до проєкту
  await prisma.task.createMany({
    data: [
      {
        title: 'Setup Database',
        status: 'DONE',
        projectId: project.id,
      },
      {
        title: 'Write API Controllers',
        status: 'IN_PROGRESS',
        projectId: project.id,
      },
      {
        title: 'Submit Report',
        status: 'TODO',
        projectId: project.id,
      },
    ],
  });
  console.log('✅ Tasks added!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });