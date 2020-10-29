import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("bootstrap");

  const serverConfig = config.get("server");
  const port = process.env.PORT || serverConfig.port;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`App is running on ${port} port`)
}
bootstrap();
