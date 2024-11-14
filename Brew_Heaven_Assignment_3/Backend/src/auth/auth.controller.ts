import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      // Throw 401 Unauthorized error if login credentials are invalid
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.login(user);
    return { ...token, isAdmin: user.isAdmin };
  }

  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    // Use the new wrapper method to find a user
    const existingUser = await this.authService.findUserByUsername(username);
    if (existingUser) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }

    // Use the new wrapper method to create a user
    const newUser = await this.authService.createUser(username, password);
    return { message: 'User created successfully', userId: newUser._id };
  }
}
