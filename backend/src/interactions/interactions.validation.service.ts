import { Injectable } from '@nestjs/common';

@Injectable()
export class InteractionValidation {
  checkId(id: number) {
    if (!id) return 1;
    if (Number.isInteger(id) === false) return 2;
    if (id > 2147483646) return 3;
    if (id < 1) return 4;
    return 0;
  }

  checkBool(bool:boolean) {
    if (typeof bool !== 'boolean')
        return 1;
    return 0;
  }
}
