import { Injectable } from '@nestjs/common';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';

@Injectable()
export class UserService {
  private readonly users: CreateUserInputDTO[] = [];

  createUser(body: CreateUserInputDTO): any {
    this.users.push(body); //create a database to add user
    return {
      message: 'User created successfully',
    };
  }

  findUserbyUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  updateUser() {
    return 'updated user';
  }
}
