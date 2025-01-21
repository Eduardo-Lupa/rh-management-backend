import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { AuthSignInDto } from 'src/auth/auth.dto';

export class CreateUserInputDTO extends AuthSignInDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  type: UserType;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty()
  cell_phone: string;
}

export type UserType = 'empresa' | 'hunter';
