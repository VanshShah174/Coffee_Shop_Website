import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow only the frontend origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
  });
    await app.listen(process.env.PORT ?? 3001);
    // app.useGlobalPipes(new ValidationPipe())
}
bootstrap();
