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

  signIn(username: string, password: string) {
    const user = this.userService.findUserbyUsername(username);

    if (!user || user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
