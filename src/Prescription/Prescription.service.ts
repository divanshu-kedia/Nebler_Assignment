import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetPrescriptionDto } from './dto/getPrescription.dto';
import { IPrescription } from './Interfaces/prescription.interfaces';
import { CreatePrescriptionDto } from './dto/createPrescription.dto';
import { Prescription } from 'src/Schema/Prescription.schema';
@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel('PrescriptionSchema')
    private prescriptionModel: Model<IPrescription>, // Injection of the Prescription model,
  ) {}

  /**
   * Fetches prescriptions for a specific patient from the database.
   * The number of prescriptions returned and the page number are defined in the payload.
   *
   * @param {GetPrescriptionDto} payload - The query parameters for fetching the prescriptions.
   * @throws {NotFoundException} - Throws an exception if no prescriptions are found for the given NHI.
   * @returns {Promise<Array<IPrescription>>} - A promise that resolves to an array of prescriptions.
   */
  async searchPrescriptionsForPatient(
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
      return prescriptions;
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

  /**
   * Transforms external prescription data to match the application's data format.
   *
   * @param {Array<any>} prescriptions - The array of prescription objects to transform.
   * @return {Array<CreatePrescriptionDto>} The transformed array of prescription objects.
   */
  transformExternalPrescriptionData(
    prescriptions: Array<any>,
  ): Array<CreatePrescriptionDto> {
    return prescriptions.map((prescription) => {
      //transform data logic accordingly
      return prescription;
    });
  }

  /**
   * Creates new prescriptions or updates existing ones based on the provided data.
   *
   * @param {Array<CreatePrescriptionDto>} prescriptions - The array of prescription DTOs to create or update.
   * @return {Promise<any>} A promise that resolves with the result of the bulkWrite operation.
   */
  async createOrUpdatePrescriptions(
    prescriptions: Array<CreatePrescriptionDto>,
  ) {
    // Map over the array of prescriptions, creating an array of updateOne operations.
    const operations = prescriptions.map((prescription) => ({
      updateOne: {
        // The filter object specifies the criteria to find the document to update.
        filter: { uniqueField: prescription._id },
        // The update object specifies the changes to be made
        update: prescription,
        // If upsert is true and no document matches the filter, a new document
        upsert: true,
      },
    }));
    // Execute the operations using the bulkWrite method of the prescriptionModel.
    return this.prescriptionModel.bulkWrite(operations);
  }
}
