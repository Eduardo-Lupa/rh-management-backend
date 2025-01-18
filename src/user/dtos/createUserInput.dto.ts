import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserInputDTO {
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  partnership: number;
}
