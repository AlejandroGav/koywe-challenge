import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../dal/user.module';
import { UserService } from '../bll/user.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || "secretJWT123",
            signOptions: { expiresIn: '60m' },
        }),
        UserModule
    ],
    providers: [AuthService, JwtStrategy, UserService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
