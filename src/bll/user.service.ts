import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../dal/user.repository';
import { CreateUserDto } from '../models/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../models/entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async register(createUserDto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findByUsername(createUserDto.username);
        if (existingUser) {
            throw new ConflictException('Username already exists');
        }

        const existingEmail = await this.userRepository.findByEmail(createUserDto.email);
        if (existingEmail) {
            throw new ConflictException('Email already exists');
        }

        return await this.userRepository.create(createUserDto);
    }

    async validateUser(username: string, pass: string): Promise<User | null> {
        const user = await this.userRepository.findByUsername(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = (user as any).toObject();
            return result as User;
        }
        return null;
    }
}
