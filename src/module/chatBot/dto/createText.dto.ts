import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { type } from 'os';

export class generateTextDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    input: string;
}
export default generateTextDTO;
