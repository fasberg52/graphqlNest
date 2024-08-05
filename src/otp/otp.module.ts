import { Module } from '@nestjs/common';
import { OTPService } from './otp.service';
import { OTPResolver } from './otp.resolver';
import { OTP } from './otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([OTP]), UserModule],
  providers: [OTPService, OTPResolver],
  exports: [OTPService],
})
export class OtpModule {}
