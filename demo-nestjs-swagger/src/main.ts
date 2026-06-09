import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('用户管理 API')
    .setDescription('这是一个演示如何使用 NestJS + Swagger 自动生成接口文档的示例项目')
    .setVersion('1.0')
    .addTag('users', '用户管理相关接口')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log(`应用已启动：http://localhost:3000`);
  console.log(`Swagger 文档：http://localhost:3000/api-docs`);
}
bootstrap();
