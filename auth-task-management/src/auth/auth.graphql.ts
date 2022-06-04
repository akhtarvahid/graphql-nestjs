import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";


@ObjectType()
export class AuthType {
    @Field()
    username: string;
}
@InputType()
export class AuthCreateInput {
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @Field()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak'
    })
    password: string;
}

@ObjectType()
export class TokenType {
    @Field()
    accessToken: string
}
