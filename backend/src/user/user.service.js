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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const user_validation_service_1 = require("./user.validation.service");
let UserService = exports.UserService = class UserService {
    signUpLocal(userData) {
        throw new Error('Method not implemented.');
    }
    constructor(validation) {
        this.validation = validation;
        this.initializePool();
    }
    initializePool() {
        this.pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
    }
    async createUser(firstname, lastname, email, username, password) {
        if (this.validation.name(firstname) > 0 ||
            this.validation.name(lastname) > 0 ||
            this.validation.email(email) > 0 ||
            this.validation.name(username) > 0 ||
            this.validation.password(password) > 0) {
            console.log('validation error');
            return null;
        }
        const cryptedPassword = bcrypt.hashSync(password, 16);
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
        }
        catch (err) {
            console.error('Erreur lors de la creation du user: ', username, err);
            return null;
        }
    }
    async updateFirstname(userId, firstname) {
        if (this.validation.name(firstname) > 0)
            return null;
        const updateDataQuery = `
      UPDATE User
      SET firstName = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [firstname, userId]);
            console.log('Firstname ', firstname, ' modifié!');
        }
        catch (err) {
            console.error('Erreur lors de la modification du firstname : ', firstname, err);
        }
    }
    async updateLastname(userId, lastname) {
        if (this.validation.name(lastname) > 0)
            return null;
        const updateDataQuery = `
      UPDATE User
      SET lastName = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [lastname, userId]);
            console.log('Lastname ', lastname, ' modifié!');
        }
        catch (err) {
            console.error('Erreur lors de la modification du lastname : ', lastname, err);
        }
    }
    async updateUsername(userId, username) {
        if (this.validation.name(username) > 0)
            return null;
        const updateDataQuery = `
      UPDATE User
      SET username = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [username, userId]);
            console.log('username ', username, ' modifié!');
        }
        catch (err) {
            console.error('Erreur lors de la modification du username : ', username, err);
        }
    }
    async updateEmail(userId, newEmail) {
        if (this.validation.email(newEmail) > 0)
            return null;
        const updateDataQuery = `
      UPDATE User
      SET email = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [newEmail, userId]);
            console.log('email ', newEmail, ' modifié!');
        }
        catch (err) {
            console.error('Erreur lors de la modification de email : ', newEmail, err);
        }
    }
    async updatePassword(userId, password) {
        if (this.validation.password(password) > 0)
            return null;
        const cryptedPassword = bcrypt.hashSync(password, 16);
        const updateDataQuery = `
      UPDATE User
      SET password = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [cryptedPassword, userId]);
            console.log('le password a été modifié!');
        }
        catch (err) {
            console.error('Erreur lors de la modification du password : ', err);
        }
    }
    async validateEmail(userId, bool) {
        if (bool !== true)
            return null;
        const updateDataQuery = `
      UPDATE User
      SET registered = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [bool, userId]);
            console.log('l email a été validé!');
        }
        catch (err) {
            console.error('Erreur lors de la validation de l email: ', err);
        }
    }
    async updateGender(userId, gender) {
        if (this.validation.gender(gender) > 0)
            return null;
        const updateDataQuery = `
      UPDATE User
      SET gender = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [gender, userId]);
            console.log('le genre a été modifié!');
        }
        catch (err) {
            console.error('Erreur lors de la modification du genre: ', err);
        }
    }
    async updateSexualPref(userId, array) {
        if (this.validation.sexualPref(array) > 0)
            return null;
        const jsonArray = JSON.stringify(array);
        const updateDataQuery = `
      UPDATE User
      SET sexualPref = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [jsonArray, userId]);
            console.log('les sexualPref ont été modifiés!');
        }
        catch (err) {
            console.error('Erreur lors de la modification des sexualPref: ', err);
        }
    }
    async updateBio(userId, bio) {
        if (this.validation.biography(bio) > 0)
            return null;
        const updateDataQuery = `
      UPDATE User
      SET biography = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [bio, userId]);
            console.log('les sexualPref ont été modifiés!');
        }
        catch (err) {
            console.error('Erreur lors de la modification des sexualPref: ', err);
        }
    }
    async updateRefreshToken(userId, token) {
        const updateDataQuery = `
      UPDATE User
      SET refresh_token = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [token, userId]);
        }
        catch (err) {
            console.error('Erreur lors de la modification du refresh_token: ', err);
        }
    }
    async deleteRefrechTocken(userId) {
        const updateDataQuery = `
      UPDATE User
      SET refresh_token = ?
      WHERE id = ?
      `;
        try {
            await this.pool.query(updateDataQuery, [null, userId]);
        }
        catch (err) {
            console.error('Erreur lors de la suppression du refresh_token: ', err);
        }
    }
    async findUserByEmail(email) {
        const query = `
    SELECT *
    FROM User
    WHERE email = ?
  `;
        try {
            const [rows] = await this.pool.query(query, [
                email,
            ]);
            return rows.length > 0 ? rows[0] : null;
        }
        catch (err) {
            console.error('Erreur lors de la recherche du user par email: ', email, err);
            return null;
        }
    }
    async findUserByUsername(username) {
        const query = `
    SELECT *
    FROM User
    WHERE username = ?
  `;
        try {
            const [rows] = await this.pool.query(query, [
                username,
            ]);
            return rows.length > 0 ? rows[0] : null;
        }
        catch (err) {
            console.error('Erreur lors de la recherche du user par username: ', username, err);
            return null;
        }
    }
    async findUserById(userId) {
        const query = `
    SELECT *
    FROM User
    WHERE id = ?
  `;
        try {
            const [rows] = await this.pool.query(query, [
                userId,
            ]);
            return rows.length > 0 ? rows[0] : null;
        }
        catch (err) {
            console.error('Erreur lors de la recherche du user par ID: ', userId, err);
            return null;
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_validation_service_1.UserValidationService])
], UserService);
//# sourceMappingURL=user.service.js.map