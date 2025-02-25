import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../bll/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async login(user: any): Promise<{ access_token: string }> {
        const payload = { username: user.username, sub: user.userId || user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        return this.userService.validateUser(username, pass);
    }
}
