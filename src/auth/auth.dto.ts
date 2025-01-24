import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignInDTO {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

// export class jwtPayResponseDTO {
//   @IsNotEmpty()
//   token: string;

//   @IsNotEmpty()
//   expiresIn: number;
// }
