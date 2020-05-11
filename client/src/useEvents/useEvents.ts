import { useState, useEffect } from 'react';
import { ajax } from 'rxjs/ajax';
import { map, tap, take } from 'rxjs/operators';

export enum EPGPEventType {
  EP = 'EP',
  GP = 'GP',
}

export interface ILootItem {
  itemId: number;
  name: string;
  rarity: string;
}

export interface IEPGPEvent {
  key: string;
  name: string;
  timestamp: Date;
  type: EPGPEventType;
  value: number;
  reason: string;
  item?: ILootItem;
}

export interface IEPGPEventRaw extends IEPGPEvent {
  _id: string;
}

const cache = new Map<string, IEPGPEvent[]>();

export const useEvents = (name: string) => {
  const [events, setEvents] = useState<IEPGPEvent[]>();

  useEffect(() => {
    const cachedEvents = cache.get(name);

    if (cachedEvents) {
      setEvents(cachedEvents);
    } else {
      ajax(`http://localhost:8080/epgp-events/listEventsByName/${name}`)
        .pipe(
          map((res) => res.response),
          map((events) =>
            events
              .map((e: IEPGPEventRaw) => ({
                ...e,
                key: e._id,
                timestamp: new Date(e.timestamp),
              }))
              .reverse(),
          ),
          tap((events) => cache.set(name, events)),
          tap((events) => setEvents(events)),
          take(1),
        )
        .subscribe();
    }
  }, [name]);

  return {
    events,
  };
};
