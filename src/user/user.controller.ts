import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';
import { User, UserType } from '@prisma/client';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findMany(@Body() body: UpdateUserInputDTO) {
    return this.userService.findMany(body);
  }

  @Get('/:id')
  findUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  // @Roles(UserType.admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @Post('/hunter')
  createHunterUser(@Body() body: CreateUserInputDTO): Promise<User | null> {
    return this.userService.createHunterUser(body);
  }

  // @Roles(UserType.admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @Post('/company')
  createCompanyUser(@Body() body: CreateUserInputDTO): Promise<User | null> {
    return this.userService.createCompanyUser(body);
  }

  @Roles(UserType.hunter)
  @UseGuards(AuthGuard, RolesGuard)
  @Put()
  updateUser(@Body() body: UpdateUserInputDTO, @Query() query: any): string {
    console.log('query: ', query);
    console.log('what you will change: ', body);
    // criaro banco de dados
    return this.userService.updateUser();
  }
}
