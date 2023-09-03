import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
/* eslint-disable */
/**
 * FhirService
 *
 * This service is responsible for interacting with the FHIR API.
 */
@Injectable()
export class FhirService {
  constructor(private httpService: HttpService) {}
  /**
   * Search a specific patient's data from the FHIR API.
   *
   * @param {string} nhi - The nhi of the patient.
   * @returns {Observable} - An Observable that will emit the patient prescription data when the HTTP request is successful.
   */
  getPatientPrescriptionRecords(nhi: string) {
    // const url = `https://example.com/fhir/MedicationRequest?subject.identifier={NHI}`;
    // return this.httpService.get(url).pipe(
    //   map((response) => {
    //   }),
    //   catchError((err) => {
    //     throw new HttpException(
    //       'Error in getting prescriptions',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }),
    // );
  }

  /**
   * Create a new prescription in the FHIR API.
   *
   * @param {any} prescriptionData - The data for the new prescription.
   * @returns {Observable} - An Observable that will emit the response data when the HTTP request is successful.
   * @throws {HttpException} - Throws an exception if an error occurs during the HTTP request.
   */
  createPrescriptionRecord(prescriptionData: any) {
    // const url = 'https://example.com/fhir/MedicationRequest';
    // return this.httpService.post(url, prescriptionData).pipe(
    //   map((response) => response.data),
    //   catchError((err) => {
    //     throw new HttpException(
    //       'Error while creating prescriptions ',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }),
    // );
  }

  /**
   * Update an existing prescription in the FHIR API.
   *
   * @param {string} medicationRequestId - The ID of the prescription to update.
   * @param {any} updatedData - The new data for the prescription.
   * @returns {Observable} - An Observable that will emit the response data when the HTTP request is successful.
   * @throws {HttpException} - Throws an exception if an error occurs during the HTTP request.
   */
  updatePrescriptionRecord(prescriptionId: string, updatedData: any) {
    // const url = `https://example.com/fhir/MedicationRequest/${prescriptionId}`;
    // return this.httpService.put(url, updatedData).pipe(
    //   map((response) => response.data),
    //   catchError((err) => {
    //     throw new HttpException(
    //       'Error while updating prescriptions',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }),
    // );
  }

  /**
   * Update an existing prescription or create the prescription in the FHIR API.
   *
   * @param {Array<any>} prescriptionList - All Prescription that we want to sync to third party
   * @returns {Observable} - An Observable that will emit the response data when the HTTP request is successful.
   * @throws {HttpException} - Throws an exception if an error occurs during the HTTP request.
   */
  upsertPrescriptions(prescriptionList: Array<any>) {
    //here we will iterate the v array and will update the prescription record if not
    //present in third party then we will create a record
  }
}
