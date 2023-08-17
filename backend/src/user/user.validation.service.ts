import { Injectable } from '@nestjs/common';
import { isAlpha } from 'validator';

@Injectable()
export class UserValidationService {
  name(name: string): number {
    if (name.length < 1 || name.length > 20) {
      console.log('name validation erreur, string trop longue ou trop courte');
      return 1;
    }
    if (isAlpha(name) === false) {
      console.log(
        'name validation erreur, la string contient des charactères interdits',
      );
      return 2;
    }
    return 0;
  }

  email(email: string): number {
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

  password(password: string): number {
    if (password.length < 8 || password.length > 30) {
      console.log(
        'password validation erreur, string trop longue ou trop courte',
      );
      return 1;
    }
    if (password.toLowerCase() === password) {
      console.log(
        'password validation erreur, doit contenir au moins une majuscule',
      );
      return 2;
    }
    if (password.toUpperCase() === password) {
      console.log(
        'password validation erreur, doit contenir au moins une minuscule',
      );
      return 3;
    }
    if (password.search(/[!@#$%^&*(),.?":{}|<>]/) === -1) {
      console.log(
        'password validation erreur, doit contenir au moins un charactère spécial',
      );
      return 4;
    }
    if (password.search(/[0123456789]/) === -1) {
      console.log(
        'password validation erreur, doit contenir au moins un chiffre',
      );
      return 5;
    }
    return 0;
  }

  gender(gender: string): number {
    gender = gender.toUpperCase();
    if (gender.length < 1 || gender.length > 3) {
      console.log(
        'gender validation erreur, string trop longue ou trop courte',
      );
      return 1;
    }
    if (gender != 'F' && gender != 'M' && gender != 'O') {
      console.log('password validation erreur, charactère non autorisé');
      return 2;
    }
    return 0;
  }

  sexualPref(array: string[]): number {
    if (array.length === 0) {
      console.log('sexualPref validation erreur, tableau vide');
      return 1;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].length < 1 || array[i].length > 20) {
        console.log(
          'sexualPref validation erreur, string trop longue ou trop courte',
        );
        return 2;
      }
      if (isAlpha(array[i]) === false) {
        console.log('sexualPref validation erreur, charactère non autorisé');
        return 3;
      }
    }
    return 0;
  }

  biography(bio: string): number {
    if (bio.length > 200) {
      console.log('biography validation erreur, string trop longue');
      return 1;
    }
  }
}
