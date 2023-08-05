import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { UserService } from '../user/user.service';

@Injectable()
export class DatabaseService {
  private connection: mysql.Connection;

  constructor(private user:UserService) {
    this.initializeDatabase(); // Pour établir la connexion lors de la creation du back
  }
  
  private async initializeDatabase() {
    await this.connectToDatabase();
    await this.createUserTable();
    await this.createInterestTable();
    await this.createUserInterestTable();
    await this.createInteractionTable();
    await this.createPictureTable();
    await this.createSearchParamTable();
    await this.user.createUser('Clara','Morgan','coucoulesloulou@gmail.com','Roger','Cbebckz@22',);
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

  private async createUserTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    firstName   VARCHAR(55) NOT NULL,
    lastName    VARCHAR(55) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    username    VARCHAR(55) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    registered  BOOLEAN DEFAULT FALSE,
    gender      VARCHAR(10),
    sexualPref  JSON,
    biography   TEXT,
    fameRating  INT
); 
   `;

    try {
      await this.connection.query(createTableQuery);
      console.log('Table User créée avec succès !');
    } catch (err) {
      console.error('Erreur lors de la création de la table User : ', err);
    }
  }

  private async createInterestTable() {
    const createTableQuery = `
CREATE TABLE IF NOT EXISTS Interest (
    id   INT PRIMARY KEY AUTO_INCREMENT,
    tag  VARCHAR(255)
);
   `;

    try {
      await this.connection.query(createTableQuery);
      console.log('Table Interest créée avec succès !');
    } catch (err) {
      console.error('Erreur lors de la création de la table Interest : ', err);
    }
  }

  private async createUserInterestTable() {
    const createTableQuery = `
CREATE TABLE IF NOT EXISTS UserInterest (
    userId      INT,
    interestId  INT,
    PRIMARY KEY (userId, interestId),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (interestId) REFERENCES Interest(id) ON DELETE CASCADE
);
   `;

    try {
      await this.connection.query(createTableQuery);
      console.log('Table UserInterest créée avec succès !');
    } catch (err) {
      console.error(
        'Erreur lors de la création de la table UserInterest : ',
        err,
      );
    }
  }

  private async createInteractionTable() {
    const createTableQuery = `
CREATE TABLE IF NOT EXISTS Interaction (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    viewerUserId  INT,
    viewedUserId  INT,
    likeStatus    BOOLEAN,
    timestamp     DATETIME
);
   `;

    try {
      await this.connection.query(createTableQuery);
      console.log('Table Interaction créée avec succès !');
    } catch (err) {
      console.error(
        'Erreur lors de la création de la table Interaction : ',
        err,
      );
    }
  }

  private async createPictureTable() {
    const createTableQuery = `
CREATE TABLE IF NOT EXISTS Picture (
    id               INT PRIMARY KEY AUTO_INCREMENT,
    userId           INT,
    url              VARCHAR(255),
    isProfilePicture BOOLEAN,
    timestamp        DATETIME
)
   `;

    try {
      await this.connection.query(createTableQuery);
      console.log('Table Picture créée avec succès !');
    } catch (err) {
      console.error('Erreur lors de la création de la table Picture : ', err);
    }
  }

  private async createSearchParamTable() {
    const createTableQuery = `
CREATE TABLE IF NOT EXISTS SearchParam (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    position     VARCHAR(255),
    distanceMax  INT,
    gender       JSON,
    ageMin       INT,
    ageMax       INT
);
   `;

    try {
      await this.connection.query(createTableQuery);
      console.log('Table SearchParam créée avec succès !');
    } catch (err) {
      console.error(
        'Erreur lors de la création de la table SearchParam : ',
        err,
      );
    }
  }

}
