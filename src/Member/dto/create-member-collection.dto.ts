import { CreateMemberDto } from './create-member.dto';

export class CreateMemberCollectionDto {
  readonly data: CreateMemberDto[];
  readonly createdDate: Date;
}
