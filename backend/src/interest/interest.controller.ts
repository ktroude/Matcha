import { Body, Controller, Get, Post, Query, Res  } from '@nestjs/common';
import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
constructor(private InterestService:InterestService) {}

    @Get('getAll')
    async getAllInterest(): Promise<any> {
        return await this.InterestService.getAllInterest();
    }

    
    @Get('getByUserId')
    async getInterestByUserId(@Query('userId') userId:number): Promise<any>  {
        return await this.InterestService.getInterestByUserId(userId);
    }

    @Post('updateUserInterest')
    async updateUserInterest(@Body('tags') tags: string[], @Body('userId') userId:number): Promise<any>  {
        return await this.InterestService.updateUserInterest(tags, userId);
    }
}