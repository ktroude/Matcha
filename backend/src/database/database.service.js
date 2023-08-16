"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
let DatabaseService = exports.DatabaseService = class DatabaseService {
    constructor() {
        this.initializeDatabase();
    }
    async initializeDatabase() {
        await this.connectToDatabase();
        await this.createUserTable();
        await this.createInterestTable();
        await this.createUserInterestTable();
        await this.createInteractionTable();
        await this.createPictureTable();
        await this.createSearchParamTable();
        this.connection.end();
    }
    async connectToDatabase() {
        this.connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
    }
    async createUserTable() {
        const createTableQuery = `
    CREATE TABLE IF NOT EXISTS User (
    id            INT PRIMARY KEY AUTO_INCREMENT,
    firstName     VARCHAR(55) NOT NULL,
    lastName      VARCHAR(55) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    username      VARCHAR(55) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    registered    BOOLEAN NOT NULL DEFAULT FALSE,
    gender        VARCHAR(10),
    sexualPref    JSON,
    biography     TEXT,
    fameRating    INT
); 
   `;
        try {
            await this.connection.query(createTableQuery);
            console.log('Table User créée avec succès !');
        }
        catch (err) {
            console.error('Erreur lors de la création de la table User : ', err);
        }
    }
    async createInterestTable() {
        const createTableQuery = `
CREATE TABLE IF NOT EXISTS Interest (
    id   INT PRIMARY KEY AUTO_INCREMENT,
    tag  VARCHAR(255)
);
   `;
        try {
            await this.connection.query(createTableQuery);
            console.log('Table Interest créée avec succès !');
        }
        catch (err) {
            console.error('Erreur lors de la création de la table Interest : ', err);
        }
    }
    async createUserInterestTable() {
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
        }
        catch (err) {
            console.error('Erreur lors de la création de la table UserInterest : ', err);
        }
    }
    async createInteractionTable() {
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
        }
        catch (err) {
            console.error('Erreur lors de la création de la table Interaction : ', err);
        }
    }
    async createPictureTable() {
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
        }
        catch (err) {
            console.error('Erreur lors de la création de la table Picture : ', err);
        }
    }
    async createSearchParamTable() {
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
        }
        catch (err) {
            console.error('Erreur lors de la création de la table SearchParam : ', err);
        }
    }
};
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
//# sourceMappingURL=database.service.js.map