import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
    id: number;
    email:string;
}

@Injectable()
export class AuthService {

    
    
    constructor(private jwt:JwtService) {}


    async signToken(user:User): Promise<string> {
        const data = {
            id: user.id,
            email: user.email,
        }
        return await this.jwt.signAsync(data);
    }



    signIn(username:string, password:string) {

        // chercher ds la db password en f de username  (en plus de recup mdp il faut recup id et email)
        //checker si mdp et username sont ok
        // creer une variable user avec id email
        // creer token avec signtoken(user)
        // creer cookie et renvoyer cookie au front
    }
}