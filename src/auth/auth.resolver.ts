// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthResponse } from './dto/auth.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const { access_token } = await this.authService.login(user);
    return { access_token };
  }

  @Mutation(() => User)
  async signUp(
    @Args('username') username: string,
    @Args('phoneNumber') phoneNumber: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.userService.create(username, phoneNumber, password);
  }
}
