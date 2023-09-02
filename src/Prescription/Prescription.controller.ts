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
  InternalServerErrorException,
  UseGuards,
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
import * as _ from 'lodash';
import { PrescriptionGuard } from '../Guards/Prescription.guard';

// import { FhirService } from 'src/Integerations/fhirService';

@ApiTags('prescriptions')
@Controller('prescription')
@UseGuards(PrescriptionGuard)
export class PrescriptionController {
  constructor(
    private readonly prescriptionService: PrescriptionService, // private readonly fhirService: FhirService  //fhirService to Interact with External API
  ) {}

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

  /**
   * This controller method is responsible for fetching the prescription data for a specific patient.
   * It receives the query parameters through GetPrescriptionDto.
   *
   * @param {GetPrescriptionDto} queryData - The query parameters received from the request.
   * @returns {Object} responseObj - An object that contains a message and the prescriptions data.
   *
   * @throws {InternalServerErrorException} - Throws an exception if an error occurs during the operation.
   */
  async searchPrescriptionsForPatient(@Query() queryData: GetPrescriptionDto) {
    try {
      // Fetches the prescription data for the patient based on the query parameters
      let prescriptionData =
        await this.prescriptionService.searchPrescriptionsForPatient(queryData);
      // Check if there are any prescriptions for the given NHI otherwise throw error
      if (!_.isEmpty(prescriptionData)) {
        //Sync the External refernece on backgroud, since we doesn't want to wait until the syncing is complete
        // this.fhirService.createOrUpdateMedicationRequest(prescriptions)
        return {
          message: 'Success',
          data: prescriptionData,
        };
      }
      //if no record found in our database then fetch it from external API
      // prescriptionData = await this.fhirService.getPatientPrescriptionRecords(
      //   queryData.nhi,
      // );

      //Transform the external API reference data to our system specific data
      // prescriptionData = this.prescriptionService.transformExternalPrescriptionData(prescriptionData);

      //If we have records in prescription data then create in our database and fetch again to get
      //correct result (our db ids)
      // if (!_.isEmpty(prescriptionData)) {
      //   await this.prescriptionService.createOrUpdatePrescriptions(
      //     prescriptionData,
      //   );
      //   prescriptionData =
      //     await this.prescriptionService.searchPrescriptionsForPatient(
      //       queryData,
      //     );
      // }

      //return response
      return {
        message: 'Success',
        data: prescriptionData,
      };

      // Constructs the response object and return response
    } catch (_err) {
      // Throws an internal server error exception if an error occurs
      throw new InternalServerErrorException(
        'An error occurred while fetching prescriptions.',
      );
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
  /**
   * This controller method is responsible for creating a new prescription for a patient.
   *
   * @param {CreatePrescriptionDto} prescription - The prescription data received from the request.
   * @returns {Object} - An object that contains a message and the newly created prescription data.
   *
   * @throws {InternalServerErrorException} - Throws an exception if an error occurs during the operation.
   */
  async createPrescriptionForPatient(
    @Body() prescription: CreatePrescriptionDto,
  ) {
    try {
      const newPrescription =
        await this.prescriptionService.createPrescriptionForPatient(
          prescription,
        );
      //Create the Prescription at external reference too in background
      // this.fhirService.createMedicationRequest(prescription);
      return {
        message: 'Success',
        data: newPrescription,
      };
    } catch (_err) {
      throw new InternalServerErrorException(
        'An error occurred while creating the prescription.',
      );
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
  @UsePipes(ValidationPipe)

  /**
   * This controller method is responsible for updating an existing prescription for a patient.
   *
   * @param {string} prescriptionId - The ID of the prescription to update.
   * @param {CreatePrescriptionDto} updatePrescriptionDTO - The updated prescription data received from the request.
   * @returns {Object} - An object that contains a message and the updated prescription data.
   *
   * @throws {InternalServerErrorException} - Throws an exception if an error occurs during the operation.
   */
  async updatePrescription(
    @Param('prescriptionId') prescriptionId: string,
    @Body() updatePrescriptionDTO: CreatePrescriptionDto,
  ) {
    try {
      const updatedPrescription =
        await this.prescriptionService.updatePrescriptionForPatient(
          prescriptionId,
          updatePrescriptionDTO,
        );
      //Update the Prescription at external reference in background
      // this.fhirService.updateMedicationRequest(_id,updatePrescriptionDTO);
      return {
        message: 'Success',
        data: updatedPrescription,
      };
    } catch (_err) {
      throw new InternalServerErrorException(
        'An error occurred while updating the prescription.',
      );
    }
  }
}
