import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { VALIDATION_PIPE_OPTIONS } from "./shared/constants";
import { RequestIdMiddleware } from "./shared/middlewares/request-id/request-id.middleware";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));
  app.use(RequestIdMiddleware);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle("Pretia Assignment Backend")
    .setDescription("Pretia Assignment Backend")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const configService = app.get(ConfigService);
  const port = configService.get<number>("port");
  await app.listen(port);
}
bootstrap();
