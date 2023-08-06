import { Controller, Get, Res  } from '@nestjs/common';
import { InterestService } from './interest.service';

@Controller('interest')
export class InterestController {
constructor(private InterestService:InterestService) {}

    @Get('getAll')
    getAllInterest(@Res() res ) {
        let interestArray:any;
        interestArray = this.InterestService.getAll();
        return res.json(interestArray);
    }

}