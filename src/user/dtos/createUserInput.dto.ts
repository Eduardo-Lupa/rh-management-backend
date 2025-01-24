import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserHunterDTO {
  id: number;

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

  @IsString()
  @IsNotEmpty()
  name: string;

  type: UserType;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty()
  cell_phone: string;

  employ_company_id: number;
}

export type UserType = 'company' | 'hunter' | 'admin';

export class CreateUserCompanyDTO {
  id: number;

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

  @IsString()
  @IsNotEmpty()
  name: string;

  type: UserType;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty()
  cell_phone: string;

  @IsNumber()
  @IsNotEmpty()
  employee_company_id: number;
}
