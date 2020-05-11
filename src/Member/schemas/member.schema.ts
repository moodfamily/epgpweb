import * as mongoose from 'mongoose';

// export const ILootItem = new mongoose.Schema({
//   GP: Number,
//   name: String,
//   itemLevel: Number,
//   itemLink: String,
// });

export const MemberSchema = new mongoose.Schema({
  name: String,
  className: String,
  EP: Number,
  GP: Number,
});

export const MemberCollectionSchema = new mongoose.Schema({
  createdDate: { type: Date, default: Date.now },
  data: [MemberSchema],
});
