import { IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class jwtPayResponseDTO {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  expiresIn: number;
}
