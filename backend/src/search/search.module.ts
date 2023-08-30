import { Module } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchValidation } from "./search.validation.service";
import { SearchController } from "./search.controller";

@Module({
    imports: [],
    controllers: [SearchController],
    providers: [SearchService, SearchValidation],
})
export class SearchModule {}