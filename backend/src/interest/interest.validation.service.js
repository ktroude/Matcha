"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestValidationService = void 0;
const common_1 = require("@nestjs/common");
let InterestValidationService = exports.InterestValidationService = class InterestValidationService {
    interestArray(tags) {
        if (tags.length > 10)
            return 1;
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
    interestTag(tag) {
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
    isAlphaOrSpaces(input) {
        for (const char of input) {
            if (!(char >= 'a' && char <= 'z') &&
                !(char >= 'A' && char <= 'Z') &&
                char !== ' ' &&
                char !== '-') {
                return false;
            }
        }
        return true;
    }
};
exports.InterestValidationService = InterestValidationService = __decorate([
    (0, common_1.Injectable)()
], InterestValidationService);
//# sourceMappingURL=interest.validation.service.js.map