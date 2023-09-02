import {
  Controller,
  Get,
  UsePipes,
  Query,
  ValidationPipe,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/createPrescription.dto';
import { GetPrescriptionDto } from './dto/getPrescription.dto';
import { PrescriptionService } from './Prescription.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('prescriptions')
@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Get('search')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
    description: 'Number of items to return',
  })
  @ApiQuery({
    name: 'nhi',
    required: true,
    type: String,
    description: 'NHI number for which we want prescription records',
  })
  @ApiOperation({ summary: 'Get prescriptions by NHI' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [CreatePrescriptionDto],
  })
  @UsePipes(ValidationPipe)
  async getPrescriptionForPatient(@Query() queryData: GetPrescriptionDto) {
    try {
      const prescriptionData =
        await this.prescriptionService.getPrescriptionForPatient(queryData);
      const responseObj = {
        message: 'List',
        data: prescriptionData,
      };
      return responseObj;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create prescription' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreatePrescriptionDto,
  })
  @UsePipes(ValidationPipe)
  async createPrescriptionForPatient(
    @Body() prescription: CreatePrescriptionDto,
  ) {
    try {
      const newPrescription =
        await this.prescriptionService.createPrescriptionForPatient(
          prescription,
        );
      return newPrescription;
    } catch (error) {
      throw error;
    }
  }

  @Put(':prescriptionId')
  @ApiOperation({ summary: 'Edit prescription' })
  @ApiParam({
    required: true,
    description: 'Prescription Id',
    name: 'prescriptionId',
    
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CreatePrescriptionDto,
  })
  @UsePipes(new ValidationPipe())
  async updatePrescription(
    @Param('prescriptionId') prescriptionId: string,
    @Body() updatePrescriptionDTO: CreatePrescriptionDto,
  ) {
    const updatedPrescription =
      await this.prescriptionService.updatePrescriptionForPatient(
        prescriptionId,
        updatePrescriptionDTO,
      );
    return updatedPrescription;
  }
}
