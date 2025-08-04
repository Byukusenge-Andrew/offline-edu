import { PrismaClient } from '@prisma/client';
import { logger } from '@/utils/logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Connect to database
prisma.$connect()
  .then(() => {
    logger.info('📄 Connected to PostgreSQL database');
  })
  .catch((error: any) => {
    logger.error('❌ Failed to connect to database:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('📄 Disconnected from database');
});
