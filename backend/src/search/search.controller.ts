import { Body, Controller, Get, Post } from '@nestjs/common';
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
    return await this.searchService.getLocationByIp(userId, ipAdress);
  }

  @Public()
  @Get('t')
  async ftt(){
    return this.searchService.calculateDistance(43.65292520968345, 7.0423054283836315, 43.85129191763416, 7.269421377634613)
  }
}
