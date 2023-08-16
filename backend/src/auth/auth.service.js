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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../src/user/user.service");
const bcrypt = require("bcrypt");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwt, userService) {
        this.jwt = jwt;
        this.userService = userService;
    }
    async signInLocal(dto) {
        const user = await this.userService.findUserByUsername(dto.username);
        if (!user)
            return null;
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (passwordMatches === false)
            return null;
        const token = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, token.refresh_token);
        return token;
    }
    async signUpLocal(dto) {
        const user = await this.userService.createUser(dto.firstname, dto.lastname, dto.email, dto.username, dto.password);
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    logout(userId) {
        return this.userService.deleteRefrechTocken(userId);
    }
    async refreshToken(userId, refreshToken) {
        const user = await this.userService.findUserById(userId);
        if (!user || !user.refresh_token)
            throw new common_1.ForbiddenException('Connexion Refusée');
        const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refresh_token);
        if (refreshTokenMatches === false)
            throw new common_1.ForbiddenException('Connexion Refusée');
        const token = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, token.refresh_token);
        return token;
    }
    async updateRefreshToken(userId, refreshToken) {
        const hash = bcrypt.hashSync(refreshToken, 16);
        await this.userService.updateRefreshToken(userId, hash);
    }
    async getTokens(userId, email) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwt.signAsync({
                sub: userId,
                email,
            }, {
                secret: 'le secret de AT dans .env',
                expiresIn: 60 * 15,
            }),
            this.jwt.signAsync({
                sub: userId,
                email,
            }, {
                secret: 'le secret du RT dans le .env',
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map