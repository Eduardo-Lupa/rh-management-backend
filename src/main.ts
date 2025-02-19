import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await ConfigModule.envVariablesLoaded; // habilita o dotenv do nest (configService)

  app.useGlobalPipes(new ValidationPipe()); // Habilitar a validação de DTOs

  app.enableCors(); // Habilitar o CORS

  await app.listen(process.env.API_PORT ?? 3000).then(() => {
    console.log(`Server is running on port ${process.env.API_PORT ?? 3000}`);
  });
}
bootstrap();
