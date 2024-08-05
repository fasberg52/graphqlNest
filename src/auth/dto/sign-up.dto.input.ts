import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  username: string;

  @Field()
  phoneNumber: string;

  @Field()
  password: string;
}
