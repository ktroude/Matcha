import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/auth/common/decorators';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post('ip')
  async getLocationByIp(
    @GetCurrentUserId() userId: number,
    @Body('ip') ipAdress: string,
  ) {
    return await this.searchService.pushLocationByIp(userId, ipAdress);
  }

  @Post('minAge')
  @HttpCode(HttpStatus.OK)
  async updateMinAge(
    @GetCurrentUserId() userId: number,
    @Body('age') age: number,
  ) {
    await this.searchService.updateMinAge(userId, age);
  }

  @Post('maxAge')
  @HttpCode(HttpStatus.OK)
  async updateMaxAge(
    @GetCurrentUserId() userId: number,
    @Body('age') age: number,
  ) {
    await this.searchService.updateMaxAge(userId, age);
  }

  @Post('distance')
  @HttpCode(HttpStatus.OK)
  async updateDistance(
    @GetCurrentUserId() userId: number,
    @Body('distance') distance: number,
  ) {
    await this.searchService.updateDistanceMax(userId, distance);
  }
}
