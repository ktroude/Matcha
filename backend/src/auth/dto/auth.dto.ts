export class LocalSignInDto {
    username: string;
    password: string;
}

export class LocalSignUpDto {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

export class TokenDto {
    id:number;
    email:string;
}