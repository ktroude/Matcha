import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class UserTableService {
  private connection: mysql.Connection;

    constructor() {
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
        password,
      ]);
      console.log('Données insérées avec succès !');
    } catch (err) {
      console.error(
        "Erreur lors de l'insertion de la creation du user: ",
        username,
        err,
      );
    }
  }
}
