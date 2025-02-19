import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  @Post('/forgot-password')
  forgotPassword(@Body() body: any) {
    return this.authService.forgotPassword(body);
  }
  
  @Post('/reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body('password') password: string) {
    return this.authService.resetPassword(token, password);
  }
}
