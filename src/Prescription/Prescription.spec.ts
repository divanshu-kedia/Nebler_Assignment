import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionController } from './Prescription.controller';
import { PrescriptionService } from './Prescription.service';

describe('MedicationRequestController', () => {
  let appController: PrescriptionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionController],
      providers: [PrescriptionService],
    }).compile();

    appController = app.get<PrescriptionController>(PrescriptionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
