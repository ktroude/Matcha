import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ValidationService } from 'src/validation/validation.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private connection: mysql.Connection;

  constructor(private validation: ValidationService) {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log('Connexion à la base de données établie !');
  }

  async createUser(
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
  ) {
    console.log('debut de la fonction');
    if (
      this.validation.name(firstname) > 0 ||
      this.validation.name(lastname) > 0 ||
      this.validation.email(email) > 0 ||
      this.validation.name(username) > 0 ||
      this.validation.password(password) > 0
    )
      return 1;

    const cryptedPassword: string = bcrypt.hashSync(password, 16);
    const insertDataQuery = `
      INSERT INTO User (firstName, lastName, email, username, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      await this.connection.query(insertDataQuery, [
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

  async changeFirstname(firstname: string) {
    if (this.validation.name(firstname) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (firstName)
      VALUES (?)
    `;
    try {
      await this.connection.query(insertDataQuery, [firstname]);
      console.log('Firstname ', firstname, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du firstname : ',
        firstname,
        err,
      );
    }
  }

  async changeLastname(lastname: string) {
    if (this.validation.name(lastname) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (lastName)
      VALUES (?)
    `;
    try {
      await this.connection.query(insertDataQuery, [lastname]);
      console.log('Lastname ', lastname, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du lastname : ',
        lastname,
        err,
      );
    }
  }

  async changeUsername(username: string) {
    if (this.validation.name(username) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (username)
      VALUES (?)
    `;
    try {
      await this.connection.query(insertDataQuery, [username]);
      console.log('username ', username, ' modifié!');
    } catch (err) {
      console.error(
        'Erreur lors de la modification du username : ',
        username,
        err,
      );
    }
  }

  async changeEmail(email: string) {
    if (this.validation.email(email) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (email)
      VALUES (?)
    `;
    try {
      await this.connection.query(insertDataQuery, [email]);
      console.log('email ', email, ' modifié!');
    } catch (err) {
      console.error('Erreur lors de la modification de email : ', email, err);
    }
  }

  async changePassword(password: string) {
    if (this.validation.password(password) > 0) return null;
    const cryptedPassword: string = bcrypt.hashSync(password, 16);
    const insertDataQuery = `
      INSERT INTO User (password)
      VALUES (?)
    `;
    try {
      await this.connection.query(insertDataQuery, [cryptedPassword]);
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
      await this.connection.query(insertDataQuery, [bool]);
      console.log('l email a été validé!');
    } catch (err) {
      console.error('Erreur lors de la validation de l email: ', err);
    }
  }

  async changeGender(gender: string) {
    if (this.validation.gender(gender) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (gender)
      VALUES (?)
    `;
    try {
      await this.connection.query(insertDataQuery, [gender]);
      console.log('le genre a été modifié!');
    } catch (err) {
      console.error('Erreur lors de la modification du genre: ', err);
    }
  }

  async changeSexualPref(array: string[]) {
    if (this.validation.sexualPref(array) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (sexualPref)
      VALUES (?)
    `;
    const jsonArray = JSON.stringify(array);
    try {
      await this.connection.query(insertDataQuery, [jsonArray]);
      console.log('les sexualPref ont été modifiés!');
    } catch (err) {
      console.error('Erreur lors de la modification des sexualPref: ', err);
    }
  }

  async changeBio(bio: string) {
    if (this.validation.biography(bio) > 0) return null;
    const insertDataQuery = `
      INSERT INTO User (biography)
      VALUES (?)
    `;
    try {
      await this.connection.query(insertDataQuery, [bio]);
      console.log('les sexualPref ont été modifiés!');
    } catch (err) {
      console.error('Erreur lors de la modification des sexualPref: ', err);
    }
  }
}
