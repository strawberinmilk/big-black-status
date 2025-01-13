import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS
  app.enableCors({
    origin: [configService.get<string>('FRONTEND_URL')],
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Ngrok-Skip-Browser-Warning',
  });

  // OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./openApi/swagger-spec.yaml', dump(document, {}));
  // SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
