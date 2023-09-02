import { Injectable, NotFoundException } from '@nestjs/common';
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
    private prescriptionModel: Model<IPrescription>,
  ) {}

  /**
   * create user activity record
   */
  async getPrescriptionForPatient(
    payload: GetPrescriptionDto,
  ): Promise<Array<IPrescription>> {
    try {
      const { nhi, size = 10, page = 1 } = payload;

      const prescriptions = await this.prescriptionModel
        .find({ 'patient.nhi': nhi })
        .select('-__v')
        .limit(size)
        .skip(size * (page - 1)) // we need to do -1 as we have to skip previous pages
        .exec();
      // if department does not exists, throw error.
      if (_.isEmpty(prescriptions)) {
        throw new NotFoundException(
          'No Prescription found for given Patient NHII',
        );
      } else {
        return prescriptions;
      }
    } catch (error) {
      throw error;
    }
  }

  async createPrescriptionForPatient(
    payload: CreatePrescriptionDto,
  ): Promise<Prescription> {
    try {
      const newPrescription = new this.prescriptionModel(payload);
      return await newPrescription.save();
    } catch (error) {
      throw error;
    }
  }

  async updatePrescriptionForPatient(
    _id: string,
    updatePrescriptionDTO: CreatePrescriptionDto,
  ): Promise<Prescription> {
    const updatedPrescription = await this.prescriptionModel
      .findByIdAndUpdate(_id, updatePrescriptionDTO, { new: true })
      .exec();

    if (!updatedPrescription) {
      console.log("yes")
      throw new NotFoundException(`Prescription with ID ${_id} not found`);
    }

    return updatedPrescription;
  }
}
