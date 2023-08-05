import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ValidationService } from 'src/validation/validation.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserTableService {
  private connection: mysql.Connection;

  constructor(private validation:ValidationService) {
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
    console.log('debut de la fonction')
    if (
      this.validation.name(firstname) > 0 ||
      this.validation.name(lastname) > 0 ||
      this.validation.email(email) > 0 ||
      this.validation.name(username) > 0 ||
      this.validation.password(password) > 0
    )
     console.log('erreur lors de la validation');


    const cryptedPassword:string = bcrypt.hashSync(password, 16);
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


}

