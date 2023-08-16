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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../../src/auth/dto");
const auth_service_1 = require("../../src/auth/auth.service");
let UserController = exports.UserController = class UserController {
    constructor(Auth) {
        this.Auth = Auth;
    }
    async userCreation(userData, res) {
        if (!userData) {
            throw new common_1.ForbiddenException('Invalid dto');
        }
        try {
            if (userData && userData.username) {
                const tokens = await this.Auth.signUpLocal(userData);
                console.log(tokens);
                res.cookie('access_token', tokens.access_token, { maxAge: 3600000, httpOnly: false });
                res.cookie('refresh_token', tokens.refresh_token, { maxAge: 3600000, httpOnly: false });
                return res.status(200).json({ success: true });
            }
            else {
                console.log("Invalid userData:", userData);
                return res.status(500).json({ success: false, message: 'Invalid user data' });
            }
        }
        catch (error) {
            console.error("Error parsing request body:", error);
            return res.status(500).json({ success: false, message: 'Error parsing request body' });
        }
    }
};
__decorate([
    (0, common_1.Post)('userCreation'),
    __param(0, (0, common_1.Body)('user')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LocalSignUpDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userCreation", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map