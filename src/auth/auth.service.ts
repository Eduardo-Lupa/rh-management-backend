import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user || user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, sub: user.id };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
