import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EPGPEvent, LootItem } from './schemas';
import { EPGPEventsController } from './epgp-events.controller';
import { EPGPEventsService } from './epgp-events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EPGPEvent', schema: EPGPEvent },
      { name: 'LootItem', schema: LootItem },
    ]),
  ],
  controllers: [EPGPEventsController],
  providers: [EPGPEventsService],
})
export class EPGPEventsModule {}
