import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const frontendUrls = (process.env.FRONTEND_URL || '').split(',');

if (!frontendUrls.length) {
  throw new Error('FRONTEND_URL no está definida en las variables de entorno');
}

app.enableCors({
  origin: (origin, callback) => {
    if (!origin || frontendUrls.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
});


  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
