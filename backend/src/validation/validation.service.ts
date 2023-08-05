import { Injectable } from '@nestjs/common';
import { isAlpha } from 'validator';

@Injectable()
export class ValidationService {

  name(name: string): number  {
    if (name.length < 3 || name.length > 20) return 1;
    if (isAlpha(name) === false) return 2;
    return 0;
  }

  email(email: string): number  {
    const atIndex = email.indexOf('@');
    const lastDotIndex = email.lastIndexOf('.');
    if (email.length < 5 || email.length > 254) return 1;
    if (atIndex <= 0 || lastDotIndex === -1) return 2;
    if (lastDotIndex < atIndex) return 3;
    if (atIndex + 1 === lastDotIndex || lastDotIndex === email.length) return 4;
    return 0;
  }

  password(password: string): number  {
    if (password.length < 8 || password.length > 30) return 1;
    if (password.toLowerCase() === password) return 2;
    if (password.toUpperCase() === password) return 3;
    if (password.search(/[!@#$%^&*(),.?":{}|<>]/) === -1) return 4;
    if (password.search(/[0123456789]/) === -1) return 5;
    return 0;
  }
}
