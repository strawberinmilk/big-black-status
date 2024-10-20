import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { dump } from 'js-yaml';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:10101',
      'https://24d9-106-72-191-104.ngrok-free.app',
    ],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

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
