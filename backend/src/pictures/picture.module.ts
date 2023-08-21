import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { FileValidationPipe } from './picture.validation.service';

@Module({
    imports: [],
    controllers: [PictureController],
    providers: [PictureService, FileValidationPipe],
})
export class PictureModule {}
