import {
  IsDate,
  IsObject,
  ValidateNested,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class PatientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  readonly nhi: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class MedicationDto {
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty()
  @IsUUID('4')
  readonly id: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  readonly dosage: string;
}
export class CreatePrescriptionDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PatientDto)
  readonly patient: PatientDto;

  @ApiProperty({ type: [MedicationDto], description: 'Prescription list' })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MedicationDto)
  readonly medications: MedicationDto[];

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  readonly date: Date;

  @IsOptional()
  readonly _id?: string;
}
