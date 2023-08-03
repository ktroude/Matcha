import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: mysql.Connection;

  constructor() {
    this.connectToDatabase(); // Pour établir la connexion lors de la creation du back
  }

  async connectToDatabase() {
    this.connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log('Connexion à la base de données établie !');
  }

  async createTable(TableName:string) {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS utilisateurs (
        id INT AUTO_INCREMENT PRIMARY KEY,
      )
    `;

    try {
      await this.connection.query(createTableQuery);
      console.log("Table ", TableName, " créée avec succès !");
    } catch (err) {
      console.error('Erreur lors de la création de la table : ', TableName, err);
    }
  }

  async insertData(nom: string, age: number) {
    const insertDataQuery = `
      INSERT INTO utilisateurs (nom, age)
      VALUES (?, ?)
    `;

    try {
      await this.connection.query(insertDataQuery, [nom, age]);
      console.log('Données insérées avec succès !');
    } catch (err) {
      console.error("Erreur lors de l'insertion des données :", err);
    }
  }


}
