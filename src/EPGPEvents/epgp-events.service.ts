import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEPGPEventDto } from './dto';
import { EPGPEvent, LootItem } from './epgp-events.interface';

@Injectable()
export class EPGPEventsService {
  constructor(
    @InjectModel('EPGPEvent') private epgpEventModel: Model<EPGPEvent>,
    @InjectModel('LootItem')
    private lootItemModel: Model<LootItem>,
  ) {}

  async create(createEPGPEventDtos: CreateEPGPEventDto[]): Promise<boolean> {
    const bulkUpdate = this.epgpEventModel.collection.initializeOrderedBulkOp();

    createEPGPEventDtos.forEach(event => {
      bulkUpdate
        .find({
          name: event.name,
          timestamp: event.timestamp,
          type: event.type,
          value: event.value,
        })
        .upsert()
        .updateOne(new this.epgpEventModel(event));
    });

    return (await bulkUpdate.execute()).ok;
  }

  async findEvents(name: string): Promise<EPGPEvent[]> {
    return this.epgpEventModel
      .find({
        name,
      })
      .exec();
  }
}
