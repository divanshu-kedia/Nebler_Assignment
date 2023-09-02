import { Module } from '@nestjs/common';
import { PrescriptionModule } from './Prescription/Prescription.module';
import { HttpModule } from '@nestjs/axios';

import { FhirService } from './Integerations/fhirService';
@Module({
  imports: [HttpModule, PrescriptionModule],
  controllers: [],
  providers: [FhirService],
})
export class AppModule {}
