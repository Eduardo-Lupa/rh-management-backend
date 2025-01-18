import { CreateUserInputDTO } from './createUserInput.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserInputDTO extends PartialType(CreateUserInputDTO) {}
