// src/otp/otp.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class OTP {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  otpCode: string;

  @Field()
  @Column()
  isUsed: boolean;

  @Field(() => Int)
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.otps)
  user: User;
}
