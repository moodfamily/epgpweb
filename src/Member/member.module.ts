import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MemberController} from './member.controller';
import {MemberService} from './member.service';
import {MemberSchema, MemberCollectionSchema} from './schemas/member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Member', schema: MemberSchema},
      {name: 'MemberCollection', schema: MemberCollectionSchema},
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
