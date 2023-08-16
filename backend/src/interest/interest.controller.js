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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestController = void 0;
const common_1 = require("@nestjs/common");
const interest_service_1 = require("./interest.service");
let InterestController = exports.InterestController = class InterestController {
    constructor(InterestService) {
        this.InterestService = InterestService;
    }
    async getAllInterest() {
        return await this.InterestService.getAllInterest();
    }
    async getInterestByUserId(userId) {
        return await this.InterestService.getInterestByUserId(userId);
    }
    async updateUserInterest(tags, userId) {
        return await this.InterestService.updateUserInterest(tags, userId);
    }
};
__decorate([
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "getAllInterest", null);
__decorate([
    (0, common_1.Get)('getByUserId'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "getInterestByUserId", null);
__decorate([
    (0, common_1.Post)('updateUserInterest'),
    __param(0, (0, common_1.Body)('tags')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "updateUserInterest", null);
exports.InterestController = InterestController = __decorate([
    (0, common_1.Controller)('interest'),
    __metadata("design:paramtypes", [interest_service_1.InterestService])
], InterestController);
//# sourceMappingURL=interest.controller.js.map