import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './Member/member.module';
import { EPGPEventsModule } from './EPGPEvents/epgp-events.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/nest'),
    MemberModule,
    EPGPEventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
