import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreatePrescriptionDto } from './dto/createPrescription.dto';
import { GetPrescriptionDto } from './dto/getPrescription.dto';
import { IPrescription } from './Interfaces/prescription.interfaces';
import { PrescriptionController } from './Prescription.controller';
import { PrescriptionService } from './Prescription.service';

describe('MedicationRequestController', () => {
  let prescriptionController: PrescriptionController;
  let prescriptionService: PrescriptionService;
  const createDto: CreatePrescriptionDto | IPrescription = {
    patient: {
      nhi: '5e1d56fb-b0f1-48ec-9ab0-d4339fd5687f',
      name: 'Divanshu',
    },
    date: new Date('02/09/2023'),
    medications: [
      {
        id: '29682f3b-0b8a-4f0f-874b-eaa0dcd5529f',
        dosage: 'Antibiotics -small',
      },
    ],
  };
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionController],
      providers: [
        {
          provide: 'PrescriptionSchemaModel',
          useValue: Model<IPrescription>, // Provide dependency value
        },
        PrescriptionService,
      ],
    }).compile();

    prescriptionService =
      moduleRef.get<PrescriptionService>(PrescriptionService);
    prescriptionController = moduleRef.get<PrescriptionController>(
      PrescriptionController,
    );
  });
  describe('Controller and service will be created Successfully', () => {
    it('Should be Successfully created', () => {
      expect(prescriptionService).not.toBeUndefined();
      expect(prescriptionController).not.toBeUndefined();
    });
  });
  describe('searchPrescriptionsForPatient', () => {
    it('should return a prescription', async () => {
      const result = { message: 'Success', data: [] };
      jest
        .spyOn(prescriptionService, 'searchPrescriptionsForPatient')
        .mockImplementation(() => Promise.resolve([]));

      expect(
        await prescriptionController.searchPrescriptionsForPatient(
          new GetPrescriptionDto(),
        ),
      ).toEqual(result);
    });

    it('should throw an error', async () => {
      jest
        .spyOn(prescriptionService, 'searchPrescriptionsForPatient')
        .mockImplementation(() => Promise.reject());

      await expect(
        prescriptionController.searchPrescriptionsForPatient(
          new GetPrescriptionDto(),
        ),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
  describe('createPrescriptionForPatient', () => {
    it('should create a prescription for a patient', async () => {
      jest
        .spyOn(prescriptionService, 'createPrescriptionForPatient')
        .mockImplementation(() => Promise.resolve(createDto as IPrescription));
      expect(
        await prescriptionController.createPrescriptionForPatient(createDto),
      ).toEqual({
        message: 'Success',
        data: createDto,
      });

      expect(
        prescriptionService.createPrescriptionForPatient,
      ).toHaveBeenCalledWith(createDto);
    });

    it('should throw an error when creating a prescription fails', async () => {
      jest
        .spyOn(prescriptionService, 'createPrescriptionForPatient')
        .mockRejectedValue(new Error());

      await expect(
        prescriptionController.createPrescriptionForPatient(createDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updatePrescription', () => {
    it('should update a prescription for a patient', async () => {
      const prescriptionId = 'prescriptionId';
      jest
        .spyOn(prescriptionService, 'updatePrescriptionForPatient')
        .mockImplementation(() => Promise.resolve(createDto as IPrescription));
      expect(
        await prescriptionController.updatePrescription(
          prescriptionId,
          createDto,
        ),
      ).toEqual({
        message: 'Success',
        data: createDto,
      });
      expect(
        prescriptionService.updatePrescriptionForPatient,
      ).toHaveBeenCalledWith(prescriptionId, createDto);
    });

    it('should throw an error when updating a prescription fails', async () => {
      const prescriptionId = 'prescriptionId';

      jest
        .spyOn(prescriptionService, 'updatePrescriptionForPatient')
        .mockRejectedValue(new Error());

      await expect(
        prescriptionController.updatePrescription(prescriptionId, createDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
