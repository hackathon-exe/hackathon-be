import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { type } from 'os';

export class CreateOrderDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;


    @ApiProperty({ type: [Number] })
    @IsNotEmpty()
    @IsArray()
    itemId: number[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    totalCost: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
export default CreateOrderDTO;
