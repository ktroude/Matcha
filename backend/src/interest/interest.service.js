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
exports.InterestService = void 0;
const common_1 = require("@nestjs/common");
const mysql = require("mysql2/promise");
const interest_validation_service_1 = require("./interest.validation.service");
const user_service_1 = require("../../src/user/user.service");
let InterestService = exports.InterestService = class InterestService {
    constructor(validation, userService) {
        this.validation = validation;
        this.userService = userService;
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
    async getAllInterest() {
        const selectDataQuery = `
      SELECT * FROM Interest
    `;
        try {
            const [rows] = await this.pool.query(selectDataQuery);
            console.log(rows);
            return rows;
        }
        catch (err) {
            console.error('Erreur lors de la récupération des interest :', err);
            return null;
        }
    }
    async addInterest(tag) {
        if (this.validation.interestTag(tag) > 0)
            return null;
        const insertDataQuery = `
      INSERT INTO Interest (tag)
      VALUES (?)
    `;
        try {
            const newTag = await this.pool.query(insertDataQuery, [tag]);
            console.log('tag ', tag, ' ajouté');
            return newTag[0].insertId;
        }
        catch (err) {
            console.error('Erreur lors de l ajout du tag : ', tag, err);
        }
    }
    async getInterestByUserId(userId) {
        const selectDataQuery = `
        SELECT * FROM UserInterest
        WHERE userId = ?
    `;
        try {
            const [rows] = await this.pool.query(selectDataQuery, [userId]);
            let interestString = [];
            for (let i = 0; i < rows.length; i++) {
                const tag = await this.getInterestById(rows[i].interestId);
                if (tag.length)
                    interestString.push(tag);
            }
            return interestString;
        }
        catch (err) {
            console.error('Erreur lors de la récupération des intérêts :', err);
            return -1;
        }
    }
    async updateUserInterest(tags, userId) {
        if (this.validation.interestArray(tags) > 0) {
            console.log('tags non valides', tags);
            throw new common_1.ForbiddenException('Wrong Tags');
        }
        if (await this.userService.findUserById(userId) === null) {
            console.log("Ce user n'existe pas dans la db: ", userId);
            throw new common_1.ForbiddenException('User does not exist');
        }
        if (await this.isUserExist(userId)) {
            await this.deleteRelation(userId);
        }
        let array = [];
        for (let i = 0; i < tags.length; i++) {
            let interestId = await this.isTagExist(tags[i]);
            if (interestId > 0)
                array.push(interestId);
            else {
                interestId = await this.addInterest(tags[i]);
                array.push(interestId);
            }
        }
        for (let j = 0; j < array.length; j++) {
            await this.createRelation(userId, array[j]);
        }
    }
    async isTagExist(tag) {
        const selectDataQuery = `
        SELECT * FROM Interest
        WHERE tag = ?
    `;
        try {
            const [rows] = await this.pool.query(selectDataQuery, [tag]);
            return rows.length > 0 ? rows[0].id : 0;
        }
        catch (err) {
            console.error('Erreur lors de la récupération des intérêts :', err);
            return -1;
        }
    }
    async isUserExist(userId) {
        const selectDataQuery = `
        SELECT * FROM UserInterest
        WHERE userId = ?
    `;
        try {
            const [rows] = await this.pool.query(selectDataQuery, [userId]);
            return rows.length > 0;
        }
        catch (err) {
            console.error('Erreur lors de la récupération des intérêts :', err);
            return false;
        }
    }
    async deleteRelation(userId) {
        const query = `
      DELETE FROM UserInterest
      WHERE UserId = ?
    `;
        try {
            const result = await this.pool.query(query, [userId]);
            console.log(`Suppression des relations pour userId ${userId} réussie`);
            return result;
        }
        catch (error) {
            console.error(`Erreur lors de la suppression des relations pour userId ${userId} :`, error);
            return null;
        }
    }
    async createRelation(userId, tagId) {
        const insertDataQuery = `
      INSERT INTO UserInterest (userId, interestId)
      VALUES (?, ?)
    `;
        try {
            await this.pool.query(insertDataQuery, [userId, tagId]);
        }
        catch (err) {
            console.error('Erreur lors de la création de la relation UserInterest :', err);
            return null;
        }
    }
    async getInterestById(tagId) {
        const selectDataQuery = `
        SELECT * FROM Interest
        WHERE id = ?
    `;
        try {
            const [rows] = await this.pool.query(selectDataQuery, [tagId]);
            return rows[0].tag;
        }
        catch (err) {
            console.error('Erreur lors de la récupération des intérêts :', err);
            return '';
        }
    }
};
exports.InterestService = InterestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [interest_validation_service_1.InterestValidationService,
        user_service_1.UserService])
], InterestService);
//# sourceMappingURL=interest.service.js.map