import * as mysql from 'mysql2/promise';
import { InterestValidationService } from './interest.validation.service';
import { UserService } from 'src/user/user.service';
export declare class InterestService {
    private validation;
    private userService;
    private pool;
    constructor(validation: InterestValidationService, userService: UserService);
    private initializePool;
    getAllInterest(): Promise<mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket>;
    addInterest(tag: string): Promise<number>;
    getInterestByUserId(userId: number): Promise<-1 | string[]>;
    updateUserInterest(tags: string[], userId: number): Promise<void>;
    isTagExist(tag: string): Promise<number>;
    isUserExist(userId: number): Promise<boolean>;
    deleteRelation(userId: number): Promise<[mysql.OkPacket | mysql.RowDataPacket[] | mysql.ResultSetHeader[] | mysql.RowDataPacket[][] | mysql.OkPacket[] | mysql.ProcedureCallPacket, mysql.FieldPacket[]]>;
    createRelation(userId: number, tagId: number): Promise<any>;
    getInterestById(tagId: number): Promise<string>;
}
