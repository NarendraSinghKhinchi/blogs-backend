import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './common/filters/mongoose.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LogsService } from './logs/logs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new MongooseExceptionFilter());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
