import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';
import { Prisma, User } from '@prisma/client';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMany(@Body() body: Prisma.UserCreateInput) {
    return this.userService.findMany(body);
  }

  @Get('/:id')
  findUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  @Post('/hunter')
  createHunterUser(@Body() body: Prisma.UserCreateInput): Promise<User | null> {
    return this.userService.createHunterUser(body);
  }

  @Post('/company')
  createCompanyUser(
    @Body() body: Prisma.UserCreateInput,
  ): Promise<User | null> {
    return this.userService.createCompanyUser(body);
  }

  @Put()
  updateUser(@Body() body: UpdateUserInputDTO, @Query() query: any): string {
    console.log('query: ', query);
    console.log('what you will change: ', body);
    // criaro banco de dados
    return this.userService.updateUser();
  }
}
