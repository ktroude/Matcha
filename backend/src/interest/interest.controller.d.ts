import { InterestService } from './interest.service';
export declare class InterestController {
    private InterestService;
    constructor(InterestService: InterestService);
    getAllInterest(): Promise<any>;
    getInterestByUserId(userId: number): Promise<any>;
    updateUserInterest(tags: string[], userId: number): Promise<any>;
}
