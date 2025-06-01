import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-blog-project', {
      // useNewUrlParser: true,
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
