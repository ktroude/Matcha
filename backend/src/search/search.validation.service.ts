import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchValidation {
  age(age: number) {
    if (!age) return 1;
    if (age < 16 || age > 100) return 2;
    if (!Number.isInteger(age)) return 3;
    return 0;
  }

  distance(distance: number) {
    if (!distance) return 1;
    if (distance < 1 || distance > 1000) return 2;
    if (!Number.isInteger(distance)) return 3;
    return 0;
  }
}
