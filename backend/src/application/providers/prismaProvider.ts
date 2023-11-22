import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class PrismaProvider {
  private readonly prisma: PrismaClient;

  constructor() {
    const { DATABASE_URL } = process.env;

    if (!DATABASE_URL) {
      throw new Error('Missing Prisma environment variables.');
    }

    this.prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
  }

  public getPrisma(): PrismaClient {
    return this.prisma;
  }
}
