import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class InterestService {
  private pool: mysql.Pool;

  constructor(private validation: ValidationService) {
    this.initializePool();
  }

  private initializePool() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  async getAll() {}
}
