import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEPGPEventDto } from './dto';
import { EPGPEvent, LootItem } from './epgp-events.interface';

const ITEM_NAME = 'item.name';
const ITEM_RARITY = 'item.rarity';
const ITEM_ID = 'item.itemId';

@Injectable()
export class EPGPEventsService {
  constructor(
    @InjectModel('EPGPEvent') private epgpEventModel: Model<EPGPEvent>,
    @InjectModel('LootItem')
    private lootItemModel: Model<LootItem>,
  ) {}

  async create(
    createEPGPEventDtos: CreateEPGPEventDto[],
  ): Promise<EPGPEvent[]> {
    return Promise.all(
      createEPGPEventDtos.map(event => {
        const item = {
          ...(event.item && {
            [ITEM_NAME]: event.item.name,
            [ITEM_RARITY]: event.item.rarity,
            [ITEM_ID]: event.item.itemId,
          }),
        };

        return this.epgpEventModel.findOneAndUpdate(
          {
            $and: [
              {
                name: event.name,
              },
              { timestamp: event.timestamp },
              { type: event.type },
            ],
          },
          {
            $set: {
              name: event.name,
              reason: event.reason,
              value: event.value,
              timestamp: event.timestamp,
              eventType: event.type,
              ...item,
            },
          },
          { upsert: true, new: true },
        );
      }),
    );
  }

  async findEvents(name: string): Promise<EPGPEvent[]> {
    return this.epgpEventModel
      .find({
        name,
      })
      .exec();
  }
}
