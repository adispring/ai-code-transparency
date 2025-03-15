import { Module } from '@nestjs/common';
import { ModelDocumentationController } from './model-documentation/model-documentation.controller';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ModelDocumentationController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
