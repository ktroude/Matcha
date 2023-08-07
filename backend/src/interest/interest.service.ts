import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { InterestValidationService } from './interest.validation.service';

@Injectable()
export class InterestService {
  private pool: mysql.Pool;

  constructor(private validation: InterestValidationService) {
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

   async getAllInterest() {
    const selectDataQuery = `
      SELECT * FROM Interest
    `;
    try {
      const [rows] = await this.pool.query(selectDataQuery);
      return rows;
    } catch (err) {
      console.error('Erreur lors de la récupération des interest :', err);
      return null;
    }
  }

  async addInterest(tag:string) {
  if (this.validation.interest(tag) > 0) return null;
    const insertDataQuery = `
      INSERT INTO interest (tag)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [tag]);
      console.log('tag ', tag, ' ajouté');
    } catch (err) {
      console.error('Erreur lors de l ajout du tag : ', tag, err);
    }
  }




}
