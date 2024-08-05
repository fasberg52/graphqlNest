import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsPhoneNumber()
  phoneNumber: string;
}
