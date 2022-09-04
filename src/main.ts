import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// const cookieSession = require('cookie-session'); //This is very special for typescript

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //method 1 for creating a cookie session on request,but it will not work duiring test
  // app.use(
  //   cookieSession({
  //     keys: ['kjjkhjkkj'],
  //   }),
  // );
  //Method 1: set validationpipe-this method will not work during e2e testing
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
