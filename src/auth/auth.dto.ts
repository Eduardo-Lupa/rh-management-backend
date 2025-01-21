import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AuthSignInDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  password: string;
}

export class jwtPayResponseDTO {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  expiresIn: number;
}
