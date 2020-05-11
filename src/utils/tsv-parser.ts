import * as parse from 'csv-parse';
import { Observable } from 'rxjs';

const TAB = '\t';

export function tsvToJSON<T>(
  tsv: string,
  columns: string[],
  looseColumnCount = true,
) {
  return new Observable<T>(observer => {
    parse(
      tsv,
      {
        columns,
        // eslint-disable-next-line @typescript-eslint/camelcase
        relax_column_count: looseColumnCount,
        delimiter: TAB,
      },
      (err, records) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(records);
        }
        observer.complete();
      },
    );
  });
}
