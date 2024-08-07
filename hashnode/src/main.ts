if(!process.env.IS_TS_NODE) {
   require('module-alias/register');
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`App running on port: 3000`)
  swaggerConfig(app);
  console.log(`Swagger is live - http://localhost:3000/api#/`)

  await app.listen(3000);
}
bootstrap();
