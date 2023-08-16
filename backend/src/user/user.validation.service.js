"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationService = void 0;
const common_1 = require("@nestjs/common");
const validator_1 = require("validator");
let UserValidationService = exports.UserValidationService = class UserValidationService {
    name(name) {
        if (name.length < 3 || name.length > 20) {
            console.log('name validation erreur, string trop longue ou trop courte');
            return 1;
        }
        if ((0, validator_1.isAlpha)(name) === false) {
            console.log('name validation erreur, la string contient des charactère interdits');
            return 2;
        }
        return 0;
    }
    email(email) {
        const atIndex = email.indexOf('@');
        const lastDotIndex = email.lastIndexOf('.');
        if (email.length < 5 || email.length > 254) {
            console.log('email validation erreur, string trop longue ou trop courte');
            return 1;
        }
        if (atIndex <= 0 || lastDotIndex === -1) {
            console.log('email validation erreur, mauvais format');
            return 2;
        }
        if (lastDotIndex < atIndex) {
            console.log('email validation erreur, mauvais format');
            return 3;
        }
        if (atIndex + 1 === lastDotIndex || lastDotIndex === email.length) {
            console.log('email validation erreur, mauvais format');
            return 4;
        }
        return 0;
    }
    password(password) {
        if (password.length < 8 || password.length > 30) {
            console.log('password validation erreur, string trop longue ou trop courte');
            return 1;
        }
        if (password.toLowerCase() === password) {
            console.log('password validation erreur, doit contenir au moins une majuscule');
            return 2;
        }
        if (password.toUpperCase() === password) {
            console.log('password validation erreur, doit contenir au moins une minuscule');
            return 3;
        }
        if (password.search(/[!@#$%^&*(),.?":{}|<>]/) === -1) {
            console.log('password validation erreur, doit contenir au moins un charactère spécial');
            return 4;
        }
        if (password.search(/[0123456789]/) === -1) {
            console.log('password validation erreur, doit contenir au moins un chiffre');
            return 5;
        }
        return 0;
    }
    gender(gender) {
        gender = gender.toUpperCase();
        if (gender.length < 1 || gender.length > 3) {
            console.log('gender validation erreur, string trop longue ou trop courte');
            return 1;
        }
        if (gender != 'F' && gender != 'M' && gender != 'O') {
            console.log('password validation erreur, charactère non autorisé');
            return 2;
        }
        return 0;
    }
    sexualPref(array) {
        if (array.length === 0) {
            console.log('sexualPref validation erreur, tableau vide');
            return 1;
        }
        for (let i = 0; i < array.length; i++) {
            if (array[i].length < 1 || array[i].length > 20) {
                console.log('sexualPref validation erreur, string trop longue ou trop courte');
                return 2;
            }
            if ((0, validator_1.isAlpha)(array[i]) === false) {
                console.log('sexualPref validation erreur, charactère non autorisé');
                return 3;
            }
        }
        return 0;
    }
    biography(bio) {
        if (bio.length > 200) {
            console.log('biography validation erreur, string trop longue');
            return 1;
        }
    }
};
exports.UserValidationService = UserValidationService = __decorate([
    (0, common_1.Injectable)()
], UserValidationService);
//# sourceMappingURL=user.validation.service.js.map