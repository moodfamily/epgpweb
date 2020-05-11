import * as mongoose from 'mongoose';

export const LootItem = new mongoose.Schema(
  {
    name: String,
    rarity: String,
    itemId: {
      type: Number,
      unique: true,
      index: true,
    },
  },
  { _id: false },
);

export const EPGPEvent = new mongoose.Schema(
  {
    timestamp: Date,
    type: String,
    name: String,
    reason: String,
    value: Number,
    item: LootItem,
  },
  { _id: false },
);
