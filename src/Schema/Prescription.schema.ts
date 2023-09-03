import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrescriptionDocument = Prescription & Document;

@Schema()
export class Prescription {
  @Prop({
    type: {
      nhi: String,
      name: String,
    },
  })
  patient: {
    nhi: string;
    name: string;
  };

  @Prop({ type: Date })
  date: Date;

  @Prop({
    type: [
      {
        id: String,
        dosage: String,
      },
    ],
  })
  medications: [
    {
      id: string;
      dosage: string;
    },
  ];
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
