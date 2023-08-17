import { Injectable } from '@nestjs/common';

@Injectable()
export class InterestValidationService {
  interestArray(tags: string[]): number {
    if (tags.length > 10) return 1;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].length === 0 || tags[i].length > 50) {
        console.error('longueur du tag incorect : ', tags[i]);
        return 2;
      }
      if (this.isAlphaOrSpaces(tags[i]) === false) {
        console.error('Ce tag ne contient des char interdits : ', tags[i]);
        return 3;
      }
    }
    return 0;
  }

  interestTag(tag: string) {
    if (tag.length === 0 || tag.length > 50) {
      console.error('longueur du tag incorect : ', tag);
      return 2;
    }
    if (this.isAlphaOrSpaces(tag) === false) {
      console.error('Ce tag ne contient des char interdits : ', tag);
      return 3;
    }
    return 0;
  }

  isAlphaOrSpaces(input: string): boolean {
    for (const char of input) {
      if (
        !(char >= 'a' && char <= 'z') &&
        !(char >= 'A' && char <= 'Z') &&
        char !== ' ' &&
        char !== '-'
      ) {
        return false;
      }
    }
    return true;
  }
}
