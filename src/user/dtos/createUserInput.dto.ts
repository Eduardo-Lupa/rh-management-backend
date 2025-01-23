import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { AuthSignInDTO } from 'src/auth/auth.dto';

export class CreateUserInputDTO extends AuthSignInDTO {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  type: UserType;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty()
  cell_phone: string;
}

export type UserType = 'company' | 'hunter' | 'admin';
