import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import * as rawbody from 'raw-body';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { tsvToJSON } from '../utils/tsv-parser';
import { MemberService } from './member.service';
import { MemberCollection } from './member.interface';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('createCollection')
  async create(@Req() req) {
    return from(rawbody(req))
      .pipe(
        map(r => r.toString().trim()),
        switchMap(reqBody =>
          tsvToJSON<CreateMemberDto[]>(
            reqBody,
            ['name', 'EP', 'GP', 'className'],
            false,
          ),
        ),
        map(parsedMemberData => ({
          data: parsedMemberData,
          createdDate: new Date(),
        })),
        switchMap(collection => from(this.memberService.create(collection))),
      )
      .toPromise();
  }

  @Get('listCollectionDates')
  async findCollections(): Promise<Date[]> {
    return this.memberService.findAllAvailableCollections();
  }

  @Get('listCollection/:collectionCreatedDate')
  async findCollection(
    @Param('collectionCreatedDate') date,
  ): Promise<MemberCollection[]> {
    return this.memberService.findCollection(new Date(date));
  }
}
