import { Controller, Post, Req, Get, Param } from '@nestjs/common';
import * as rawbody from 'raw-body';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { tsvToJSON } from '../utils/tsv-parser';
import { EPGPEventsService } from './epgp-events.service';
import { CreateEPGPEventDtoRaw } from './dto';
import { EPGPEvent } from './epgp-events.interface';

@Controller('epgp-events')
export class EPGPEventsController {
  constructor(private readonly epgpEventsService: EPGPEventsService) {}

  @Post('create')
  async create(@Req() req) {
    return from(rawbody(req))
      .pipe(
        map(r => r.toString().trim()),
        switchMap(reqBody =>
          tsvToJSON<CreateEPGPEventDtoRaw[]>(reqBody, [
            'timestamp',
            'type',
            'name',
            'reason',
            'value',
            'item',
          ]),
        ),
        map(parsedEvents => {
          return parsedEvents.map(event => ({
            ...event,
            timestamp: new Date(Number(event.timestamp) * 1000),
            ...(event.item && {
              item: {
                itemId: Number(event.item.split('|')[2].split(':')[1]),
                name: event.item.split('|')[3].split('h')[1],
                rarity: event.item.split('|')[1],
              },
            }),
          }));
        }),
        switchMap(events => from(this.epgpEventsService.create(events))),
      )
      .toPromise();
  }

  @Get('listEventsByName/:name')
  async listEventsByName(@Param('name') name): Promise<EPGPEvent[]> {
    return this.epgpEventsService.findEvents(name);
  }

  //   @Get('listCollectionDates')
  //   async findCollections(): Promise<Date[]> {
  //     return this.memberService.findAllAvailableCollections();
  //   }

  //   @Get('listCollection/:collectionCreatedDate')
  //   async findCollection(
  //     @Param('collectionCreatedDate') date,
  //   ): Promise<MemberCollection[]> {
  //     return this.memberService.findCollection(new Date(date));
  //   }
}
