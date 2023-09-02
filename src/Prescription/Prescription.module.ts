import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrescriptionSchema } from 'src/Schema/Prescription.schema';
import { PrescriptionController } from './Prescription.controller';
import { PrescriptionService } from './Prescription.service';
import { config } from 'dotenv';
config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      dbName: process.env.DATABASE_NAME,
    }),
    MongooseModule.forFeature([
      { name: 'PrescriptionSchema', schema: PrescriptionSchema },
    ]),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
