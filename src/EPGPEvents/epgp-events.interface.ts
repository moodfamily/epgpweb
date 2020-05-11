import { Document } from 'mongoose';

export interface LootItem extends Document {
  name: string;
  rarity: string;
  itemId: number;
}

export interface EPGPEvent extends Document {
  timestamp: Date;
  eventType: string;
  name: string;
  reason: string;
  value: number;
  item: LootItem;
}
