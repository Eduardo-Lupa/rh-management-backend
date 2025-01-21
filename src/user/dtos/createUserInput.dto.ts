import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInputDTO {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  type: UserType;

  @IsString()
  @IsNotEmpty()
  cell_phone: string;
}

export type UserType = 'empresa' | 'hunter';
