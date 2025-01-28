import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles/roles.guard';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [UserType, ...UserType[]]) =>
  applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
