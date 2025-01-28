import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';
import { User, UserType } from '@prisma/client';
import {
  CreateUserCompanyDTO,
  CreateUserHunterDTO,
} from './dtos/createUserInput.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  getMe(@Req() req: Request) {
    return this.userService.getMe(req);
  }

  @Roles(UserType.admin)
  @UseGuards(AuthGuard)
  @Get()
  findMany(@Body() body: UpdateUserInputDTO) {
    return this.userService.findMany(body);
  }

  @Roles(UserType.admin)
  @Get('/:id')
  findUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findUserById(id);
  }

  // @Roles(UserType.admin)
  // @UseGuards(AuthGuard)
  @Post('/hunter') // TODO apenas admins podem criar usuários
  createHunterUser(@Body() body: CreateUserHunterDTO): Promise<User | null> {
    return this.userService.createHunterUser(body);
  }

  // @Roles(UserType.admin)
  // @UseGuards(AuthGuard)
  @Post('/company')
  createCompanyUser(@Body() body: CreateUserCompanyDTO): Promise<User | null> {
    return this.userService.createCompanyUser(body);
  }

  @UseGuards(AuthGuard)
  @Put()
  updateUser(@Body() body: UpdateUserInputDTO, @Query() query: any): string {
    console.log('query: ', query);
    console.log('what you will change: ', body);
    // criaro banco de dados
    return this.userService.updateUser();
  }

  @Roles(UserType.company)
  @UseGuards(AuthGuard)
  @Post('/job')
  createJob(@Body() body: any) {
    return this.userService.createJob(body);
  }
}
