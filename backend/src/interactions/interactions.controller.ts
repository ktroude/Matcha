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
  async isItAMatch(@GetCurrentUserId() userId: number, @Query('id') viewedId) {
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
}
