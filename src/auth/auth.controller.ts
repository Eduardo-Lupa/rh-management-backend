import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
// import { UserType } from '@prisma/client';
// import { Roles } from 'src/decorators/roles.decorator';
// import { RolesGuard } from './roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() body: AuthSignInDTO) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('/type')
  userType(@Req() req: any) {
    return this.authService.userType(req);
  }
}
