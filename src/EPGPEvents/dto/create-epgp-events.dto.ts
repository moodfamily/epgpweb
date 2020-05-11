export class LootItemDto {
  name: string;
  rarity: string;
  itemId: number;
}

export class CreateEPGPEventCommon {
  readonly timestamp: Date;
  readonly type: string;
  readonly name: string;
  readonly reason: string;
  readonly value: number;
}
export class CreateEPGPEventDto extends CreateEPGPEventCommon {
  readonly item: LootItemDto;
}

export class CreateEPGPEventDtoRaw extends CreateEPGPEventCommon {
  readonly item: string;
}
