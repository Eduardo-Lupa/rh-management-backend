import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  private readonly jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
  ) {
    this.jwtExpirationTimeInSeconds = +this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { ...user, password: undefined, sub: user.id };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds,
      type: user.type,
    };
  }

  async userType(req: any) {
    return req.user.type;
  }

  async forgotPassword(body: any) {
    const user = await this.prismaService.user.findUnique({
      where: { email: body.email },
    });

    if (!user) throw new Error('User not found');

    // Gera um token JWT válido por 20 min
    const token = this.jwtService.sign(
      { email: body.email },
      { expiresIn: 1200 },
    );

    // Link para redefinir a senha
    const resetLink = `http://localhost:3002/login/forgot-password/${token}`;

    // Envia o email com o link de redefinição
    await this.emailService.sendEmail(
      body.email,
      'Redefinição de Senha',
      `Clique no link para redefinir sua senha: ${resetLink}`,
    );

    return { message: 'E-mail de redefinição enviado' };
  }

  async resetPassword(token: string, password: string) {
    // try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      console.log("decodedToken ",decodedToken);
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.prismaService.user.update({
        where: { email: decodedToken.email },
        data: { password: hashedPassword },
      });

      return { message: 'Senha redefinida com sucesso' };
    // } catch (error) {
    //   throw new UnauthorizedException('Token inválido ou expirado');
    // }
  }
}
