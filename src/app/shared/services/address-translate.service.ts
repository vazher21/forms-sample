import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
interface IKaMap {
  [key: string]: string;
}
@Injectable({
  providedIn: 'root',
})
export class AddressTranslateService {
  private readonly KA_MAP: IKaMap = {
    ა: 'a',
    ბ: 'b',
    გ: 'g',
    დ: 'd',
    ე: 'e',
    ვ: 'v',
    ზ: 'Z',
    თ: 't',
    ი: 'i',
    კ: 'k',
    ლ: 'l',
    მ: 'm',
    ნ: 'n',
    ო: 'o',
    პ: 'p',
    ჟ: 'j',
    რ: 'r',
    ს: 's',
    ტ: 't',
    უ: 'u',
    ფ: 'f',
    ქ: 'q',
    ღ: 'gh',
    ყ: 'y',
    შ: 'sh',
    ჩ: 'ch',
    ც: 'c',
    ძ: 'dz',
    წ: 'w',
    ჭ: 'ch',
    ხ: 'x',
    ჯ: 'j',
    ჰ: 'h',
  };

  translateAddress(address: string) {
    const result = address
      .split('')
      .map((letter) => (this.KA_MAP[letter] ? this.KA_MAP[letter] : letter))
      .join('');
    return of(result).pipe(delay(100));
  }
}
