import { Document } from 'mongoose';

export interface Member extends Document {
  name: string;
  className: string;
  EP: number;
  GP: number;
}

export interface MemberCollection extends Document {
  data: Member[];
  createdDate: Date;
}
