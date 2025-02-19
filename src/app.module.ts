import { Module } from '@nestjs/common';
import { UserModule } from './user/user.modules';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CompanyModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
