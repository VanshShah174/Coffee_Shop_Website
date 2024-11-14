import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string, password: string }) {
    return this.authService.login(loginDto);
  }

  // Additional endpoint for signup if needed
  @Post('signup')
  async signup(@Body() signupDto: { username: string, password: string, role: string }) {
    // Call UsersService to create a new user
  }
}
