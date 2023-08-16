import * as mysql from 'mysql2/promise';
import { UserValidationService } from './user.validation.service';
import { LocalSignUpDto } from 'src/auth/dto';
export declare class UserService {
    private validation;
    signUpLocal(userData: LocalSignUpDto): void;
    private pool;
    constructor(validation: UserValidationService);
    private initializePool;
    createUser(firstname: string, lastname: string, email: string, username: string, password: string): Promise<mysql.RowDataPacket | null>;
    updateFirstname(userId: number, firstname: string): Promise<any>;
    updateLastname(userId: number, lastname: string): Promise<any>;
    updateUsername(userId: number, username: string): Promise<any>;
    updateEmail(userId: number, newEmail: string): Promise<any>;
    updatePassword(userId: number, password: string): Promise<any>;
    validateEmail(userId: number, bool: boolean): Promise<any>;
    updateGender(userId: number, gender: string): Promise<any>;
    updateSexualPref(userId: number, array: string[]): Promise<any>;
    updateBio(userId: number, bio: string): Promise<any>;
    updateRefreshToken(userId: number, token: string): Promise<void>;
    deleteRefrechTocken(userId: number): Promise<void>;
    findUserByEmail(email: string): Promise<mysql.RowDataPacket | null>;
    findUserByUsername(username: string): Promise<mysql.RowDataPacket | null>;
    findUserById(userId: number): Promise<mysql.RowDataPacket | null>;
}
