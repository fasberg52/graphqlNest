// src/otp/otp.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OTPService } from './otp.service';
import { UserService } from '../user/user.service';

@Resolver()
export class OTPResolver {
  constructor(
    private readonly otpService: OTPService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Boolean)
  async generateOTP(
    @Args('phoneNumber') phoneNumber: string,
  ): Promise<boolean> {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (!user) return false;
    return this.otpService.createOTP(user);
  }

  @Mutation(() => Boolean)
  async verifyOTP(
    @Args('phoneNumber') phoneNumber: string,
    @Args('otpCode') otpCode: string,
  ): Promise<boolean> {
    return this.otpService.verifyOTP(phoneNumber, otpCode);
  }
}
