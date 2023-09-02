import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPrescriptionDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  readonly nhi: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  size: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number;
}
