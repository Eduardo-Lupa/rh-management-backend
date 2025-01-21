import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
// import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(where: Prisma.UserCreateInput) {
    return this.prisma.user.findMany({
      where,
    });
  }

  async createHunterUser(body: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...body,
        type: 'hunter',
      },
    });
  }

  async createCompanyUser(body: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...body,
        type: 'empresa',
      },
    });
  }

  async findUserbyUsername(name: string) {
    return this.prisma.user.findMany({
      where: {
        name: name,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findUserById(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  updateUser() {
    return 'updated user';
  }
}
