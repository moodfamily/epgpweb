import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MemberModule } from './Member/member.module';
import { EPGPEventsModule } from './EPGPEvents';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/epgp', {
      useCreateIndex: true,
      bufferCommands: true,
      useFindAndModify: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'build'),
    }),
    MemberModule,
    EPGPEventsModule,
  ],
})
export class AppModule {}
