import { ForbiddenException, Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import { UserValidationService } from './user.validation.service';

@Injectable()
export class UserService {
  private pool: mysql.Pool;

  constructor(private validation: UserValidationService) {
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

  async createUser(
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
  ): Promise<mysql.RowDataPacket | null> {
    console.log("creating user...");
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    console.log(username);
    console.log(password);
    if (
      this.validation.name(firstname) > 0 ||
      this.validation.name(lastname) > 0 ||
      this.validation.email(email) > 0 ||
      this.validation.name(username) > 0 ||
      this.validation.password(password) > 0
    ) {
      console.log('validation error');
      return null;
    }
    console.log("user created...");

    const cryptedPassword: string = bcrypt.hashSync(password, 10);
    const insertDataQuery = `
      INSERT INTO User (firstName, lastName, email, username, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      await this.pool.query(insertDataQuery, [
        firstname,
        lastname,
        email,
        username,
        cryptedPassword,
      ]);
      console.log('Données insérées avec succès !');
      const user = await this.findUserByEmail(email);
      return user;
    } catch (err) {
      console.error('Erreur lors de la creation du user: ', username, err);
      return null;
    }
  }

  async updateFirstname(userId: number, firstname: string) {
    if (this.validation.name(firstname) > 0)
      throw new ForbiddenException('Firstname invalide');
    const updateDataQuery = `
      UPDATE User
      SET firstName = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [firstname, userId]);
      console.log('Firstname ', firstname, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du firstname : ',
        firstname,
        err,
      );
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async updateLastname(userId: number, lastname: string) {
    if (this.validation.name(lastname) > 0)
      throw new ForbiddenException('Lastname invalide');
    const updateDataQuery = `
      UPDATE User
      SET lastName = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [lastname, userId]);
      console.log('Lastname ', lastname, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du lastname : ',
        lastname,
        err,
      );
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async updateUsername(userId: number, username: string) {
    if (this.validation.name(username) > 0)
      throw new ForbiddenException('Username invalide');
    const updateDataQuery = `
      UPDATE User
      SET username = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [username, userId]);
      console.log('username ', username, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du username : ',
        username,
        err,
      );
      throw new ForbiddenException(
        'Utilisateur introuvable ou username deja pris',
      );
    }
  }

  async updateEmail(userId: number, newEmail: string) {
    if (this.validation.email(newEmail) > 0) {
      throw new ForbiddenException('Email invalide');
    }
    const updateDataQuery = `
      UPDATE User
      SET email = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [newEmail, userId]);
      console.log('email ', newEmail, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification de email : ',
        newEmail,
        err,
      );
      throw new ForbiddenException(
        "L'utilisateur n'existe pas ou l'adresse mail est deja prise",
      );
    }
  }

  async updatePassword(userId: number, password: string) {
    if (this.validation.password(password) > 0) {
      throw new ForbiddenException('Mot de passe trop simple');
    }
    const cryptedPassword: string = bcrypt.hashSync(password, 10);
    const updateDataQuery = `
      UPDATE User
      SET password = ?
      WHERE id = ?
      `;
    try {
      await this.pool.query(updateDataQuery, [cryptedPassword, userId]);
      console.log('le password a été modifié!');
    } catch (err) {
      console.error('Erreur lors de la modification du password : ', err);
      throw new ForbiddenException("L'utilisateur n'existe pas imo");
    }
  }

  async validateEmail(userId: number, bool: boolean) {
    if (bool !== true) return null;
    const updateDataQuery = `
      UPDATE User
      SET registered = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [bool, userId]);
      console.log('l email a été validé!');
    } catch (err) {
      console.error('Erreur lors de la validation de l email: ', err);
    }
  }

  async updateGender(userId: number, gender: string) {
    if (this.validation.gender(gender) > 0)
      throw new ForbiddenException('Genre invalide');
    const updateDataQuery = `
      UPDATE User
      SET gender = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [gender, userId]);
      console.log('le genre a été modifié!');
    } catch (err) {
      console.error('Erreur lors de la modification du genre: ', err);
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async updateSexualPref(userId: number, array: string[]) {
    if (this.validation.sexualPref(array) > 0)
      throw new ForbiddenException('Prefs invalides');
    const jsonArray = JSON.stringify(array);
    const updateDataQuery = `
      UPDATE User
      SET sexualPref = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [jsonArray, userId]);
      console.log('les sexualPref ont été modifiés!');
    } catch (err) {
      console.error('Erreur lors de la modification des sexualPref: ', err);
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async updateBio(userId: number, bio: string) {
    if (this.validation.biography(bio) > 0)
      throw new ForbiddenException('Bio invalide');
    const updateDataQuery = `
      UPDATE User
      SET biography = ?
      WHERE id = ?
      `;
    try {
      await this.pool.query(updateDataQuery, [bio, userId]);
      console.log('les sexualPref ont été modifiés!');
    } catch (err) {
      console.error('Erreur lors de la modification des sexualPref: ', err);
      throw new ForbiddenException('Utilisateur introuvable');
    }
  }

  async updateRefreshToken(userId: number, token: string) {
    const updateDataQuery = `
      UPDATE User
      SET refresh_token = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [token, userId]);
    } catch (err) {
      console.error('Erreur lors de la modification du refresh_token: ', err);
    }
  }

  async deleteRefrechTocken(userId: number) {
    const updateDataQuery = `
      UPDATE User
      SET refresh_token = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [null, userId]);
    } catch (err) {
      console.error('Erreur lors de la suppression du refresh_token: ', err);
    }
  }

  async findUserByEmail(email: string): Promise<mysql.RowDataPacket | null> {
    const query = `
    SELECT *
    FROM User
    WHERE email = ?
  `;

    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        email,
      ]);
      return rows.length > 0 ? rows[0] : null; // Retourne le premier utilisateur trouvé ou null si aucun n'est trouvé
    } catch (err) {
      console.error(
        'Erreur lors de la recherche du user par email: ',
        email,
        err,
      );
      return null;
    }
  }

  async findUserByUsername(
    username: string,
  ): Promise<mysql.RowDataPacket | null> {
    const query = `
    SELECT *
    FROM User
    WHERE username = ?
    LIMIT 1
  `;

    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        username,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error(
        'Erreur lors de la recherche du user par username: ',
        username,
        err,
      );
      return null;
    }
  }

  async findUserById(userId: number): Promise<mysql.RowDataPacket | null> {
    const query = `
    SELECT *
    FROM User
    WHERE id = ?
  `;

    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        userId,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error(
        'Erreur lors de la recherche du user par ID: ',
        userId,
        err,
      );
      return null;
    }
  }
}
