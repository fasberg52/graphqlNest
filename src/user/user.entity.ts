// src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OTP } from 'src/otp/otp.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ unique: true })
  phoneNumber: string;

  @OneToMany(() => OTP, (otp) => otp.user)
  otps: OTP[];
}
