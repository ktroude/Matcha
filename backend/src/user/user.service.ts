import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ValidationService } from 'src/validation/validation.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    private pool: mysql.Pool;

  constructor(private validation: ValidationService) {
    this.initializePool ();
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
  ) {
    if (
      this.validation.name(firstname) > 0 ||
      this.validation.name(lastname) > 0 ||
      this.validation.email(email) > 0 ||
      this.validation.name(username) > 0 ||
      this.validation.password(password) > 0
    ){
      console.log('validation error');
      return null;
    }

    const cryptedPassword: string = bcrypt.hashSync(password, 16);
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
    } catch (err) {
      console.error('Erreur lors de la creation du user: ', username, err);
    }
  }

  async updateFirstname(firstname: string) {
    if (this.validation.name(firstname) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (firstName)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [firstname]);
      console.log('Firstname ', firstname, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du firstname : ',
        firstname,
        err,
      );
    }
  }

  async updateLastname(lastname: string) {
    if (this.validation.name(lastname) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (lastName)
      VALUES ()
    `;
    try {
      await this.pool.query(insertDataQuery, [lastname]);
      console.log('Lastname ', lastname, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du lastname : ',
        lastname,
        err,
      );
    }
  }

  async updateUsername(username: string) {
    if (this.validation.name(username) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (username)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [username]);
      console.log('username ', username, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du username : ',
        username,
        err,
      );
    }
  }

  async updateEmail(email: string) {
    if (this.validation.email(email) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (email)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [email]);
      console.log('email ', email, ' modifié!');
    } catch (err) {
      console.error('Erreur lors de la modification de email : ', email, err);
    }
  }

  async updatePassword(password: string) {
    if (this.validation.password(password) > 0) return null;
    const cryptedPassword: string = bcrypt.hashSync(password, 16);
    const insertDataQuery = `
      INSERT INTO User (password)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [cryptedPassword]);
      console.log('le password a été modifié!');
    } catch (err) {
      console.error('Erreur lors de la modification du password : ', err);
    }
  }

  async validateEmail(bool: boolean) {
    if (bool !== true) return null;
    const insertDataQuery = `
      INSERT INTO User (registered)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [bool]);
      console.log('l email a été validé!');
    } catch (err) {
      console.error('Erreur lors de la validation de l email: ', err);
    }
  }

  async updateGender(gender: string) {
    if (this.validation.gender(gender) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (gender)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [gender]);
      console.log('le genre a été modifié!');
    } catch (err) {
      console.error('Erreur lors de la modification du genre: ', err);
    }
  }

  async updateSexualPref(array: string[]) {
    if (this.validation.sexualPref(array) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (sexualPref)
      VALUES (?)
    `;
    const jsonArray = JSON.stringify(array);
    try {
      await this.pool.query(insertDataQuery, [jsonArray]);
      console.log('les sexualPref ont été modifiés!');
    } catch (err) {
      console.error('Erreur lors de la modification des sexualPref: ', err);
    }
  }

  async updateBio(bio: string) {
    if (this.validation.biography(bio) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (biography)
      VALUES (?)
    `;
    try {
      await this.pool.query(insertDataQuery, [bio]);
      console.log('les sexualPref ont été modifiés!');
    } catch (err) {
      console.error('Erreur lors de la modification des sexualPref: ', err);
    }
  }
}
