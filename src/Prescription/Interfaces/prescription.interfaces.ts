export interface IPrescription {
  patient: {
    nhi: string;
    name: string;
  };
  date: Date;
  medications: [
    {
      id: string;
      dosage: string;
    },
  ];
  _id?: string;
}
