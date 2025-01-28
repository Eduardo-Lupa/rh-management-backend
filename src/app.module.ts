import { Module } from '@nestjs/common';
import { UserModule } from './user/user.modules';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
