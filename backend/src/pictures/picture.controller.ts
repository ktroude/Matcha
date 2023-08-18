import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PictureService } from './picture.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('picture')
export class PictureController {
  constructor(private pictureService: PictureService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @GetCurrentUserId() userId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log('debut de la ft');
    return await this.pictureService.uploadFiles(files, userId);
  }

  @Get('get')
  async getImage(
    @GetCurrentUserId() userId: number,
    @Query('id') pictureId: number,
    @Res() res: Response,
  ) {
    const imagePath = await this.pictureService.getPicturebyId(
      userId,
      pictureId,
    );
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else throw new NotFoundException('Image not found');
  }
}
