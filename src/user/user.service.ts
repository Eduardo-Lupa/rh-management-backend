import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

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

  async createHunterUser(
    body: Prisma.UserUncheckedCreateWithoutMain_user_companyInput,
  ) {
    return await this.prisma.user.create({
      data: {
        ...body,
        password: await this.hashPassword(body.password),
        type: 'hunter',
        employee_company_id: null,
      },
    });
  }

  async createCompanyUser(
    body: Prisma.UserUncheckedCreateWithoutMain_user_companyInput,
  ) {
    return await this.prisma.user.create({
      data: {
        ...body,
        password: await this.hashPassword(body.password),
        type: 'company',
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

  async getMe(req: any) {
    return {
      id: req.user.id,
      name: req.user.name,
      type: req.user.type,
      image: req.user.image ? req.user.image : undefined,
      email: req.user.email,
      cell_phone: req.user.cell_phone,
      created_at: req.user.created_at,
      employee_company_id: req.user.employee_company_id,
    };
  }

  updateUser() {
    return 'updated user';
  }

  createJob(body: any) {
    console.log(body);
    return 'created job';
  }
}
