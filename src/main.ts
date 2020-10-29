import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressLayouts from 'express-ejs-layouts';
import * as sassMiddleware from 'node-sass-middleware';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // view
  app.useStaticAssets(join(__dirname, '..', 'templates/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'templates/views/pages'));
  app.setViewEngine('ejs');
  app.use(expressLayouts);

  // sass
  if (process.env.NODE_ENV === 'development') {
    app.use(
      sassMiddleware({
        src: join(__dirname, '..', 'templates/assets'),
        dest: join(__dirname, '..', 'templates/public'),
        debug: true,
      }),
    );
  }

  // security
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 100, // 1 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  // openapi
  if (process.env.NODE_ENV === 'development') {
    const options = new DocumentBuilder()
      .setTitle('Purpose API')
      .setDescription('The purpose API description')
      .setVersion('1.0')
      .addTag('cloud vision api')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT || 3000);

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
