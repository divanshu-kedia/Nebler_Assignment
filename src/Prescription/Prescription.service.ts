import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetPrescriptionDto } from './dto/getPrescription.dto';
import { IPrescription } from './Interfaces/prescription.interfaces';
import * as _ from 'lodash';
import { CreatePrescriptionDto } from './dto/createPrescription.dto';
import { Prescription } from 'src/Schema/Prescription.schema';
@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel('PrescriptionSchema')
    private prescriptionModel: Model<IPrescription>, // Injection of the Prescription model
  ) {}

  /**
   * Fetches prescriptions for a specific patient from the database.
   * The number of prescriptions returned and the page number are defined in the payload.
   *
   * @param {GetPrescriptionDto} payload - The query parameters for fetching the prescriptions.
   * @throws {NotFoundException} - Throws an exception if no prescriptions are found for the given NHI.
   * @returns {Promise<Array<IPrescription>>} - A promise that resolves to an array of prescriptions.
   */
  async getPrescriptionForPatient(
    payload: GetPrescriptionDto,
  ): Promise<Array<IPrescription>> {
    try {
      const { nhi, size = 10, page = 1 } = payload; // Default values for size and page if not provided

      // Fetching prescriptions from the database based on the patient's NHI
      const prescriptions = await this.prescriptionModel
        .find({ 'patient.nhi': nhi })
        .select('-__v') // Exclude the __v field
        .limit(size) // Limit the number of results
        .skip(size * (page - 1)) // Skip the prescriptions of the previous pages
        .exec();
      // Check if there are any prescriptions for the given NHI otherwise throw error
      if (_.isEmpty(prescriptions)) {
        throw new NotFoundException(
          'No Prescription found for given Patient NHI',
        );
      } else {
        return prescriptions;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new prescription for a patient in the database.
   *
   * @param {CreatePrescriptionDto} payload - The data for the new prescription.
   * @throws {Error} - Throws an exception if an error occurs during the operation.
   * @returns {Promise<Prescription>} - A promise that resolves to the newly created prescription.
   */

  async createPrescriptionForPatient(
    payload: CreatePrescriptionDto,
  ): Promise<Prescription> {
    try {
      // Create a new prescription document
      const newPrescription = new this.prescriptionModel(payload);
      // Save the prescription document to the database and return it
      return await newPrescription.save();
    } catch (error) {
      throw error; // If an error occurs, throw it
    }
  }

  /**
   * Updates an existing prescription in the database.
   *
   * @param {string} _id - The ID of the prescription to update.
   * @param {CreatePrescriptionDto} updatePrescriptionDTO - The updated prescription data.
   * @throws {NotFoundException} - Throws an exception if no prescription is found with the given ID.
   * @throws {InternalServerErrorException} - Throws an exception if some error occurs during updating.
   *
   * @returns {Promise<Prescription>} - A promise that resolves to the updated prescription.
   */
  async updatePrescriptionForPatient(
    _id: string,
    updatePrescriptionDTO: CreatePrescriptionDto,
  ): Promise<Prescription> {
    try {
      // Find the prescription by id and update it
      const updatedPrescription = await this.prescriptionModel
        .findByIdAndUpdate(_id, updatePrescriptionDTO, { new: true })
        .exec(); // Execute the query

      if (!updatedPrescription) {
        throw new NotFoundException(`Prescription with ID ${_id} not found`);
      }
      // Return the updated prescription
      return updatedPrescription;
    } catch (_err) {
      throw new InternalServerErrorException();
    }
  }
}
