// tslint:disable:no-any
import { Pipe, PipeTransform } from '@angular/core';
import * as fuzzy from 'fuzzysort';
import memo from 'memo-decorator';
import KeysOptions = Fuzzysort.KeysOptions;
import KeysResults = Fuzzysort.KeysResults;
import Prepared = Fuzzysort.Prepared;


function replaceAccents(str: string): string {
  return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
}

interface AutocompletePipeOptions {
  normalize: boolean;
  showAllWhenEmpty: boolean;
  keys: string[];
  targets: { [key: string]: string }[];
}

const normPrefix = '_norm';

@Pipe({
  name: 'autocomplete',
  pure: true,
})
export class AutocompletePipe implements PipeTransform {
  transform(inputValue: string, {
    normalize = true,
    showAllWhenEmpty = true,
    keys = [],
    targets = [],
  }: AutocompletePipeOptions): KeysResults<any> {
    if (showAllWhenEmpty && !inputValue) {
      return <any>targets.map(target => ({obj: target})) as KeysResults<any>;
    }

    return <any>fuzzy.go(
      replaceAccents(inputValue),
      this.prepareTargets(targets, keys, normalize),
      {
        allowTypo: true,
        keys: normalize
          ? keys.map(key => `${normPrefix}${key}`)
          : keys
      } as KeysOptions<any>
    ) as KeysResults<any>;
  }

  @memo()
  private prepareTargets(targets: { [key: string]: string }[], keys: string[], normalize: boolean): Prepared[] {
    return <any>targets.map((item) => ({
      ...normalize && keys.reduce((acc, key) => ({...acc, [`${normPrefix}${key}`]: replaceAccents(item[key])}), {}),
      ...item
    })) as Prepared[];
  }
}
