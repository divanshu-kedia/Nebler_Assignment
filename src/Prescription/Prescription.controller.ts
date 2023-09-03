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
import { SearchPrescriptionDTO } from './dto/searchPrescription.dto';
import { PrescriptionService } from './Prescription.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import * as _ from 'lodash';
import { AuthorizationGuard } from '../Guards/Authorization.guard';
import { responseFormatter } from '../utils/helper';
// import { FhirService } from 'src/Integerations/fhirService';

@ApiTags('prescriptions')
@Controller('prescription')
@UseGuards(AuthorizationGuard)
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
  @ApiOperation({ summary: 'Search prescriptions by NHI' })
  @ApiResponse({
    status: 200,
    description: 'Prescription fetched successfully',
    type: [CreatePrescriptionDto],
  })
  @UsePipes(ValidationPipe)
  /**
   * This controller method is responsible for fetching the prescription data for a specific patient.
   * It receives the query parameters through SearchPrescriptionDTO.
   *
   * @param {SearchPrescriptionDTO} queryData - The query parameters received from the request.
   * @returns {Object} responseObj - An object that contains a message and the prescriptions data.
   *
   * @throws {InternalServerErrorException} - Throws an exception if an error occurs during the operation.
   */
  async searchPatientPrescriptions(@Query() queryData: SearchPrescriptionDTO) {
    try {
      // Fetches the prescription data for the patient based on the query parameters
      const prescriptionData =
        await this.prescriptionService.searchPatientPrescriptions(queryData);
      // Check if there are any prescriptions for the given NHI otherwise throw error
      if (!_.isEmpty(prescriptionData)) {
        //Sync the External refernece on backgroud, since we doesn't want to wait until the syncing is complete
        // this.fhirService.upsertPrescriptions(prescriptions)
        return responseFormatter(prescriptionData);
      }
      //if no record found in our database then fetch it from external API
      // const externalPrescriptions = await this.fhirService.getPatientPrescriptionRecords(
      //   queryData.nhi,
      // );

      //Transform the external API reference data to our system specific data
      // prescriptionData = this.prescriptionService.transformExternalPrescriptionData(externalPrescriptions);

      //If we have records in prescription data then create in our database and fetch again to get
      //correct result (specifically db Ids which will be used to update prescription)
      // if (!_.isEmpty(prescriptionData)) {
      //   await this.prescriptionService.upsertPrescriptions(
      //     prescriptionData,
      //   );
      //   prescriptionData =
      //     await this.prescriptionService.searchPatientPrescriptions(
      //       queryData,
      //     );
      // }

      //return response
      return responseFormatter(prescriptionData);

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
      // this.fhirService.createPrescriptionRecord(prescription);
      return responseFormatter(newPrescription);
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
      // this.fhirService.updatePrescriptionRecord(_id,updatePrescriptionDTO);
      return responseFormatter(updatedPrescription);
    } catch (_err) {
      throw new InternalServerErrorException(
        'An error occurred while updating the prescription.',
      );
    }
  }
}
