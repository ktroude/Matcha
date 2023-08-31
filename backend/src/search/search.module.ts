import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchValidation } from "./search.validation.service";
import { SearchController } from "./search.controller";
import { UserService } from "src/user/user.service";
import { UserValidationService } from "src/user/user.validation.service";

@Module({
    imports: [],
    controllers: [SearchController],
    providers: [SearchService, SearchValidation, UserService, UserValidationService],
})
export class SearchModule {}