import { Pipe, PipeTransform } from '@angular/core';
import { go as search } from 'fuzzysort';
import memo from 'memo-decorator';
import KeysResults = Fuzzysort.KeysResults;

function replaceAccents(str: string): string {
  return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
}

interface AutocompletePipeOptions<T> {
  allowTypo: boolean;
  keys: string[];
  normalize: boolean;
  showAllWhenEmpty: boolean;
  targets: T[];
}

interface StringMap {
  [key: string]: string;
}

const normPrefix = '_norm';

@Pipe({
  name: 'autocomplete',
  pure: true,
})
export class AutocompletePipe implements PipeTransform {
  transform(inputValue: string, {
    allowTypo = true,
    keys = [],
    normalize = false,
    showAllWhenEmpty = true,
    targets = [],
  }: AutocompletePipeOptions<StringMap>): KeysResults<StringMap> {
    if (showAllWhenEmpty && !inputValue) {
      return Object.defineProperties(targets.map(target => ({obj: target})), {score: {value: 0}, total: {value: targets.length}});
    }

    // This is the search function from fuzzy-sort library (to demonstrate the functionality).
    // It can be replaced by any other filter for searching.
    return search<StringMap>(
      replaceAccents(inputValue),
      this.prepareTargets(targets, keys, normalize),
      {
        allowTypo,
        keys: normalize // add prefix to the keys because we will be filtering the normalised targets
          ? keys.map(key => `${normPrefix}${key}`)
          : keys
      }
    );
  }

  @memo()
  private prepareTargets(targets: StringMap[], keys: string[], normalize: boolean): StringMap[] {
    return targets.map((item) => ({
      // when normalisation is on, add prefixed keys to target items
      ...normalize && keys.reduce((acc, key) => ({...acc, [`${normPrefix}${key}`]: replaceAccents(item[key])}), {}),
      ...item
    }));
  }
}
