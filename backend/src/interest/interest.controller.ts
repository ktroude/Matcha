import { Body, Controller, Get, Post, Query, HttpCode, HttpStatus  } from '@nestjs/common';
import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
constructor(private InterestService:InterestService) {}

    @Get('getAll')
    @HttpCode(HttpStatus.OK)
    async getAllInterest(): Promise<any> {
        return await this.InterestService.getAllInterest();
    }

    
    @Get('getByUserId')
    @HttpCode(HttpStatus.OK)
    async getInterestByUserId(@Query('userId') userId:number): Promise<any>  {
        return await this.InterestService.getInterestByUserId(userId);
    }

    @Post('updateUserInterest')
    @HttpCode(HttpStatus.OK)
    async updateUserInterest(@Body('tags') tags: string[], @Body('userId') userId:number): Promise<any>  {
        return await this.InterestService.updateUserInterest(tags, userId);
    }
}