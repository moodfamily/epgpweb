import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member, MemberCollection } from './member.interface';
import { CreateMemberCollectionDto } from './dto/create-member-collection.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel('Member') private memberModel: Model<Member>,
    @InjectModel('MemberCollection')
    private memberCollectionModel: Model<MemberCollection>,
  ) {}

  async create(
    createMemberCollectionDto: CreateMemberCollectionDto,
  ): Promise<MemberCollection> {
    const createdCollection = new this.memberCollectionModel(
      createMemberCollectionDto,
    );
    return createdCollection.save();
  }

  async findAllAvailableCollections(): Promise<Date[]> {
    return (
      await this.memberCollectionModel
        .find(
          {},
          {
            createdDate: 1,
          },
        )
        .exec()
    ).map(collection => {
      return collection.createdDate;
    });
  }

  async findCollection(date: Date): Promise<MemberCollection[]> {
    return this.memberCollectionModel
      .find({
        createdDate: date,
      })
      .exec();
  }
}
