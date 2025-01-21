import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
// import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  hashPassword = async (password: string) => {
    const saltRounds = +this.configService.get<string>('BCRYPT_SALT');
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  async findMany(where: UpdateUserInputDTO) {
    return await this.prisma.user.findMany({
      where: {
        id: where?.id,
        cell_phone: where?.cell_phone,
        email: where?.email,
        name: where?.name,
        type: where?.type,
      },
    });
  }

  async createHunterUser(body: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: {
        ...body,
        password: await this.hashPassword(body.password),
        type: 'hunter',
      },
    });
  }

  async createCompanyUser(body: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: {
        ...body,
        password: await this.hashPassword(body.password),
        type: 'empresa',
      },
    });
  }

  async findUserbyName(name: string) {
    return await this.prisma.user.findMany({
      where: {
        name: name,
      },
    });
  }

  async findUserByEmail(email: string) {
    // email is unique
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  updateUser() {
    return 'updated user';
  }
}
