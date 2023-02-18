import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;


    @ApiProperty()
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
