import { Module } from "@nestjs/common";
import { InteractionController } from "./interactions.controller";
import { InteractionService } from "./interactions.service";
import { InteractionValidation } from "./interactions.validation.service";

@Module({
    imports: [],
    controllers: [InteractionController],
    providers: [InteractionService, InteractionValidation],
})
export class InteractionModule {}
