import { SetMetadata } from '@nestjs/common';
import { UserType } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [UserType, ...UserType[]]) =>
  SetMetadata(ROLES_KEY, roles);
