import { Controller, Post, UseInterceptors, UploadedFiles, HttpCode, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';


@Controller('picture')
export class PictureController {
    constructor(
        private pictureService:PictureService,
        ) {}

    @Post('upload')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@GetCurrentUserId() userId:number, @UploadedFiles() files: Array<Express.Multer.File>) {
        return await this.pictureService.uploadFiles(files, userId);
    }

}
