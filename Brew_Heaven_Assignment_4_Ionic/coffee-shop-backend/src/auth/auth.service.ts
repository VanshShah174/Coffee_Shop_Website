import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Check for admin credentials
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (username === adminUsername && password === adminPassword) {
      return { username, isAdmin: true };
    }

    // Check if the user exists and validate password
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { ...user.toObject(), isAdmin: false }; // Regular user
    }

    return null; // Return null if validation fails
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user._id, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUserByUsername(username: string) {
    return this.usersService.findOne(username);
  }

  async createUser(username: string, password: string) {
    // Check if user already exists
    const existingUser = await this.usersService.findOne(username);
    if (existingUser) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash the password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create(username, hashedPassword);
  }
}
