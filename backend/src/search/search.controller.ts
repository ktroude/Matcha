import { Body, Controller, Post } from '@nestjs/common';
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
}
