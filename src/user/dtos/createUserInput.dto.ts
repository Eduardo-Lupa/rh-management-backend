import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserInputDTO {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  type: UserType;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty()
  cell_phone: string;
}

export type UserType = 'empresa' | 'hunter';
