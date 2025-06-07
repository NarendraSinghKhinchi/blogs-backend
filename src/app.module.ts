import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // add this
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://lucifer:p5tb6G5jzsG0nZfq@cluster0.chll4ey.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0', {
     
    }),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
