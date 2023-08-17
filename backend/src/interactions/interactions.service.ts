import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InteractionValidation } from './interactions.validation.service';
import * as mysql from 'mysql2/promise';

@Injectable()
export class InteractionService {
  private pool: mysql.Pool;

  constructor(private validation: InteractionValidation) {
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

  async addInteraction(userId: number, viewedId: number, liked: boolean) {
    if (
      this.validation.checkId(userId) > 0 ||
      this.validation.checkId(viewedId) > 0 ||
      this.validation.checkBool(liked) > 0
    )
      throw new UnprocessableEntityException('datas incorrectes');
    const insertDataQuery = `
      INSERT INTO Interaction (viewerUserId, viewedUserId, likeStatus)
      VALUES (?, ?, ?)
    `;
    try {
      await this.pool.query(insertDataQuery, [userId, viewedId, liked]);
    } catch (err) {
      throw new BadRequestException("Erreur lors de l'insertion des données");
    }
  }

  async isItAMatch(userId, viewedId): Promise<boolean> {
    const query = `
    SELECT *
    FROM Interaction
    WHERE viewerUserId = ?
    AND viewedUserId = ?
  `;

    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
        viewedId,
      ]);
      if (rows.length === 0 || !rows[0] || !rows[0].likeStatus) return false;
      return rows[0].likeStatus;
    } catch (err) {
      throw new BadRequestException("Erreur lors de l'insertion des données");
    }
  }
}
