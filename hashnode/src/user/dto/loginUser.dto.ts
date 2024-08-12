import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @ApiProperty({
        type: 'string'
    })
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty({
        type: 'string'
    })
    readonly password: string;
}