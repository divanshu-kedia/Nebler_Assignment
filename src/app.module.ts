import { Module } from '@nestjs/common';
import { PrescriptionModule } from './Prescription/Prescription.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    PrescriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
