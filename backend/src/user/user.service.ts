import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import * as bcrypt from 'bcrypt';
import { UserValidationService } from './user.validation.service';
import { error } from 'console';

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
    if (
      this.validation.name(firstname) > 0 ||
      this.validation.name(lastname) > 0 ||
      this.validation.email(email) > 0 ||
      this.validation.name(username) > 0 ||
      this.validation.password(password) > 0
    )
      throw new ForbiddenException('input error detected');

    if (await this.isEmailAlreadyExist(email))
      throw new ConflictException('This email address is already taken');
    if (await this.isUsernameAlreadyExist(username))
      throw new ConflictException('This username is already taken');

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
      const user = await this.findUserByEmail(email);
      return user;
    } catch (err) {
      console.log('erreur : ', err);
      throw new ForbiddenException('error detected');
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

  async updateBirthdate(userId: number, birthdate: string) {
    if (this.validation.birthdate(birthdate) > 0)
      throw new ForbiddenException('Birthdate invalide');
    const updateDataQuery = `
      UPDATE User
      SET birthdate = ?
      WHERE id = ?
      `;

    try {
      await this.pool.query(updateDataQuery, [birthdate, userId]);
      console.log('birthdate ', birthdate, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du birthdate : ',
        birthdate,
        err,
      );
      throw new ForbiddenException(
        'Utilisateur introuvable ou username deja pris',
      );
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
    LIMIT 1
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
      console.log(rows[0]);
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

  async isUsernameAlreadyExist(username: string) {
    const query = `
    SELECT *
    FROM User
    WHERE username = ?
  `;
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        username,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('Erreur', err);
      return null;
    }
  }

  async isEmailAlreadyExist(email: string) {
    const query = `
    SELECT *
    FROM User
    WHERE email = ?
  `;
    try {
      const [rows] = await this.pool.query<mysql.RowDataPacket[]>(query, [
        email,
      ]);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      console.error('Erreur', err);
      return null;
    }
  }

  convertBirthdayInAge(birthday: string): number {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    let difference = today.getFullYear() - birthdayDate.getFullYear();
    const monthDiff = today.getMonth() - birthdayDate.getMonth();
    if (monthDiff < 0) {
      difference--;
    } else if (monthDiff === 0 && today.getDate() < birthdayDate.getDate()) {
      difference--;
    }
    return difference;
  }
}
