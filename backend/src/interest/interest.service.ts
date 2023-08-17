import { ForbiddenException, Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { InterestValidationService } from './interest.validation.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InterestService {
  private pool: mysql.Pool;

  constructor(
    private validation: InterestValidationService,
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

  async getAllInterest() {
    const selectDataQuery = `
      SELECT * FROM Interest
    `;
    try {
      const [rows] = await this.pool.query(selectDataQuery);
      console.log(rows);
      return rows;
    } catch (err) {
      console.error('Erreur lors de la récupération des interest :', err);
      return null;
    }
  }

  async addInterest(tag: string) {
    if (this.validation.interestTag(tag) > 0) return null;
    const insertDataQuery = `
      INSERT INTO Interest (tag)
      VALUES (?)
    `;
    try {
      const newTag: [mysql.ResultSetHeader, mysql.FieldPacket[]] =
        await this.pool.query(insertDataQuery, [tag]);
      console.log('tag ', tag, ' ajouté');
      return newTag[0].insertId;
    } catch (err) {
      console.error('Erreur lors de l ajout du tag : ', tag, err);
    }
  }

  // retourne les interets d'un user
  async getInterestByUserId(userId: number) {
    const selectDataQuery = `
        SELECT * FROM UserInterest
        WHERE userId = ?
    `;
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
        selectDataQuery,
        [userId],
      );
      let interestString: string[] = [];
      for (let i = 0; i < rows.length; i++) {
        const tag: string = await this.getInterestById(rows[i].interestId);
        if (tag.length) interestString.push(tag);
      }
      return interestString;
    } catch (err) {
      console.error('Erreur lors de la récupération des intérêts :', err);
      return -1;
    }
  }

  // creer les relation user / tag dans la db.
  async updateUserInterest(tags: string[], userId: number) {
    if (this.validation.interestArray(tags) > 0) {
      console.log('tags non valides', tags);
      throw new ForbiddenException('Wrong Tags');
    }
    if ((await this.userService.findUserById(userId)) === null) {
      console.log("Ce user n'existe pas dans la db: ", userId);
      throw new ForbiddenException('User does not exist');
    }
    // checker si le user exist dans la db UserInterest
    if (await this.isUserExist(userId)) {
      // supprimer tout ses tags si il existe
      await this.deleteRelation(userId);
    }
    let array: number[] = [];
    for (let i = 0; i < tags.length; i++) {
      let interestId = await this.isTagExist(tags[i]);
      // checker si le tag existe dans la table Interest
      if (interestId > 0) array.push(interestId);
      //sinon on l'ajoute
      else {
        interestId = await this.addInterest(tags[i]);
        array.push(interestId);
      }
    }
    // et enfin on creer toutes les nouvelles relations
    for (let j = 0; j < array.length; j++) {
      await this.createRelation(userId, array[j]);
    }
  }

  // check si le tag exist dans la db, return son id ou 0 si il n'existe pas (-1 sur erreur)
  async isTagExist(tag: string): Promise<number> {
    const selectDataQuery = `
        SELECT * FROM Interest
        WHERE tag = ?
    `;
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
        selectDataQuery,
        [tag],
      );
      return rows.length > 0 ? rows[0].id : 0;
    } catch (err) {
      console.error('Erreur lors de la récupération des intérêts :', err);
      return -1;
    }
  }

  async isUserExist(userId: number): Promise<boolean> {
    const selectDataQuery = `
        SELECT * FROM UserInterest
        WHERE userId = ?
    `;
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
        selectDataQuery,
        [userId],
      );
      return rows.length > 0;
    } catch (err) {
      console.error('Erreur lors de la récupération des intérêts :', err);
      return false;
    }
  }

  async deleteRelation(userId: number) {
    const query = `
      DELETE FROM UserInterest
      WHERE UserId = ?
    `;
    try {
      const result = await this.pool.query(query, [userId]);
      console.log(`Suppression des relations pour userId ${userId} réussie`);
      return result;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression des relations pour userId ${userId} :`,
        error,
      );
      return null;
    }
  }

  async createRelation(userId: number, tagId: number) {
    const insertDataQuery = `
      INSERT INTO UserInterest (userId, interestId)
      VALUES (?, ?)
    `;
    try {
      await this.pool.query(insertDataQuery, [userId, tagId]);
    } catch (err) {
      console.error(
        'Erreur lors de la création de la relation UserInterest :',
        err,
      );
      return null;
    }
  }

  async getInterestById(tagId: number): Promise<string> {
    const selectDataQuery = `
        SELECT * FROM Interest
        WHERE id = ?
    `;
    try {
      const [rows] = await this.pool.query(selectDataQuery, [tagId]);
      return rows[0].tag;
    } catch (err) {
      console.error('Erreur lors de la récupération des intérêts :', err);
      return '';
    }
  }
}
