import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';
import { User } from '@prisma/client';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMany(@Body() body: UpdateUserInputDTO) {
    return this.userService.findMany(body);
  }

  @Get('/:id')
  findUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  @Post('/hunter')
  createHunterUser(@Body() body: CreateUserInputDTO): Promise<User | null> {
    return this.userService.createHunterUser(body);
  }

  @Post('/company')
  createCompanyUser(@Body() body: CreateUserInputDTO): Promise<User | null> {
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
