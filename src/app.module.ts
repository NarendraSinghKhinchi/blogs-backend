import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { LogsModule } from './logs/logs.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lucifer:p5tb6G5jzsG0nZfq@cluster0.chll4ey.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0',
      {},
    ),
    TypeOrmModule.forRoot(typeOrmConfig),
    BlogModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
