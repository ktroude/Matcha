import {
  Controller,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { InteractionService } from './interactions.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';

@Controller('interaction')
export class InteractionController {
  constructor(private interactionService: InteractionService) {}

  @Get('match')
  @HttpCode(HttpStatus.OK)
  async isItAMatch(@GetCurrentUserId() userId: number, @Query('id') viewedId:number) {
    return await this.interactionService.isItAMatch(userId, viewedId);
  }

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  async addInteraction(
    @GetCurrentUserId() userId: number,
    @Body('viewedId') viewedId: number,
    @Body('liked') liked: boolean,
  ) {
    return await this.interactionService.addInteraction(
      userId,
      viewedId,
      liked,
    );
  }

  @Get('liked')
  @HttpCode(HttpStatus.OK)
  async getLiked(@GetCurrentUserId() userId:number) {
    const liked = await this.interactionService.getLiked(userId);
    return await this.interactionService.checkBlocked(userId, liked);
  }

    @Get('viewed')
  @HttpCode(HttpStatus.OK)
  async getViewed(@GetCurrentUserId() userId:number) {
    const liked = await this.interactionService.getviewed(userId);
    return await this.interactionService.checkBlocked(userId, liked);
  }

  @Get('dislike')
  @HttpCode(HttpStatus.OK)
  async getDislike(@GetCurrentUserId() userId:number) {
    const liked = await this.interactionService.getDisliked(userId);
    return await this.interactionService.checkBlocked(userId, liked);
  }

  @Get('viewed')
  @HttpCode(HttpStatus.OK)
  async getBlocked(@GetCurrentUserId() userId:number) {
    return await this.interactionService.getBlocked(userId);
  }
}
