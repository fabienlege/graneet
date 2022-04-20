import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Initialize the app
  const app = await NestFactory.create(AppModule);

  // Initialize the config service
  const config = app.get(ConfigService);

  // get the port from the config service
  const port = config.get('PORT') || 3000;
  console.log(`Listening on port ${port}`);

  //Cors configuration
  app.enableCors();

  // Start the server
  await app.listen(port);
}
bootstrap();
