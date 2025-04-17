import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserCredentialsDto {
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example: 'xyz@gmail.com'
    })
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example: 'xyz@63'
    })
    readonly password: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @ApiProperty({
        type: UserCredentialsDto
    })
    readonly user: UserCredentialsDto;
}