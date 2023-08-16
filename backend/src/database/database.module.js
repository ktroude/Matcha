"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseModule = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
const SearchParamTable_service_1 = require("./SearchParamTable.service");
const PictureTable_service_1 = require("./PictureTable.service");
const InteractionTable_service_1 = require("./InteractionTable.service");
let DataBaseModule = exports.DataBaseModule = class DataBaseModule {
};
exports.DataBaseModule = DataBaseModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [
            database_service_1.DatabaseService,
            SearchParamTable_service_1.SearchParamTableService,
            PictureTable_service_1.PictureTableService,
            InteractionTable_service_1.InteractionTableService,
        ],
    })
], DataBaseModule);
//# sourceMappingURL=database.module.js.map