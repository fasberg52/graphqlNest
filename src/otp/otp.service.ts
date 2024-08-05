// src/otp/otp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OTP } from './otp.entity';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import { User } from 'src/user/user.entity';

@Injectable()
export class OTPService {
  constructor(
    @InjectRepository(OTP)
    private otpRepository: Repository<OTP>,
    private readonly userService: UserService,
  ) {}

  async createOTP(user: User): Promise<boolean> {
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const otp = this.otpRepository.create({
      otpCode,
      isUsed: false,
      user,
    });
    await this.otpRepository.save(otp);
    return true;
  }

  async verifyOTP(phoneNumber: string, otpCode: string): Promise<boolean> {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
    if (!user) return false;

    const otp = await this.otpRepository.findOne({
      where: { user, otpCode, isUsed: false },
    });

    if (otp) {
      otp.isUsed = true;
      await this.otpRepository.save(otp);
      return true;
    }
    return false;
  }
}
