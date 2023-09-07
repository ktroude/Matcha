import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InteractionValidation } from './interactions.validation.service';
import * as mysql from 'mysql2/promise';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InteractionService {
  private pool: mysql.Pool;

  constructor(
    private validation: InteractionValidation,
    private userService: UserService,
  ) {
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

  async addInteraction(
    userId: number,
    viewedId: number,
    liked: boolean | null,
  ) {
    try {
      if (
        this.validation.checkId(userId) > 0 ||
        this.validation.checkId(viewedId) > 0 ||
        this.validation.checkBool(liked) > 0
      )
        throw new UnprocessableEntityException('datas incorrectes');
      if (liked) {
        const insertDataQuery = `
        INSERT INTO Interaction (viewerUserId, viewedUserId, likeStatus)
        VALUES (?, ?, ?)
        `;
        await this.pool.query(insertDataQuery, [userId, viewedId, liked]);
        return await this.isItAMatch(userId, viewedId);
      } else {
        const insertDataQuery = `
        INSERT INTO Interaction (viewerUserId, viewedUserId)
        VALUES (?, ?)
        `;
        await this.pool.query(insertDataQuery, [userId, viewedId]);
      }
    } catch (err) {
      throw new BadRequestException("Erreur lors de l'insertion des données");
    }
  }

  async isItAMatch(userId: number, viewedId: number): Promise<boolean> {
    try {
      if (
        this.validation.checkId(userId) > 0 ||
        this.validation.checkId(viewedId) > 0
      )
        throw new UnprocessableEntityException('datas incorrectes');
      const query = `
    SELECT *
    FROM Interaction
    WHERE viewerUserId = ?
    AND viewedUserId = ?
  `;

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

  async getLiked(userId: number) {
    try {
      const query = `
      SELECT viewerUserId, block
      FROM Interaction
      WHERE viewedUserId = ?
      AND likeStatus = ?`;
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
        true,
      ]);
      if (!rows || !rows[0]) return null;
      return rows;
    } catch (err) {
      throw new BadRequestException("Erreur lors de l'insertion des données");
    }
  }

  async getDisliked(userId: number) {
    try {
      const query = `
      SELECT viewerUserId, block
      FROM Interaction
      WHERE viewedUserId = ?
      AND likeStatus = ?`;
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
        false,
      ]);
      if (!rows || !rows[0]) return null;
      return rows;
    } catch (err) {
      throw new BadRequestException("Erreur lors de l'insertion des données");
    }
  }

  async getviewed(userId: number) {
    try {
      const query = `
      SELECT viewerUserId, block
      FROM Interaction
      WHERE viewedUserId = ?`;
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
      ]);
      if (!rows || !rows[0]) return null;
      return rows;
    } catch (err) {
      throw new BadRequestException("Erreur lors de l'insertion des données");
    }
  }

  async checkBlocked(userId: number, arrayToCheck: any[]) {
    if (!arrayToCheck) return null;
    const query = `
      SELECT viewerUserId, viewedUserId
      FROM Interaction
      WHERE viewedUserId = ?
      OR viewerUserId = ?
      `;
    const [blocked] = await this.pool.query<mysql.RowDataPacket[]>(query, [
      userId,
      userId,
    ]);
    const setOfVarAValues = new Set(blocked.map((item) => item.varA));
    const setOfVarBValues = new Set(blocked.map((item) => item.varB));
    // A tester, besoin de retirer userId des set? Pas sur a voir    


    const filteredArray = arrayToCheck.filter((elem) => {
      return !(
        setOfVarAValues.has(elem.viewedUserId) ||
        setOfVarBValues.has(elem.viewerUserId)
      );
    });

    return filteredArray;
  }

  async getBlocked(userId: number) {
    try {
      const query = `
      SELECT viewedUserId,
      FROM Interaction
      WHERE viewerUserId = ?
      AND block = ?
      `;
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
        true,
      ]);
      if (!rows || !rows[0]) return null;
      return rows;
    } catch (err) {
      throw new BadRequestException("Erreur lors de l'insertion des données");
    }
  }
}
