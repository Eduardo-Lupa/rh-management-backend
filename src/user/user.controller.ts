import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserInputDTO): any {
    // Criar o banco de dados
    return this.userService.createUser(body);
  }

  @Put()
  updateUser(@Body() body: UpdateUserInputDTO, @Query() query: any): string {
    console.log('query: ', query);
    console.log('what you will change: ', body);
    // criaro banco de dados
    return this.userService.updateUser();
  }
}
