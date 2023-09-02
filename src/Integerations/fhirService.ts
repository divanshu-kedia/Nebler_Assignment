import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

/**
 * FhirService
 *
 * This service is responsible for interacting with the FHIR API.
 */
@Injectable()
export class FhirService {
  constructor(private httpService: HttpService) {}
  /**
   * Fetch a specific patient's data from the FHIR API.
   *
   * @param {string} nhi - The nhi of the patient.
   * @returns {Observable} - An Observable that will emit the patient's data when the HTTP request is successful.
   */
  getPatientPrescriptionRecords(nhi: string) {
    // const url = `https://example.com/fhir/MedicationRequest?subject.identifier={NHI}`;
    // return this.httpService.get(url).pipe(
    //   map((response) => {
    //     //Check if this record exist in our DB if not create it in our database
    //   }),
    //   catchError((err) => {
    //     throw new HttpException(
    //       'Error in getting medication request',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }),
    // );
  }

  /**
   * Create a new medication request in the FHIR API.
   *
   * @param {any} medicationRequestData - The data for the new medication request.
   * @returns {Observable} - An Observable that will emit the response data when the HTTP request is successful.
   * @throws {HttpException} - Throws an exception if an error occurs during the HTTP request.
   */
  createMedicationRequest(medicationRequestData: any) {
    // const url = 'https://example.com/fhir/MedicationRequest';
    // return this.httpService.post(url, medicationRequestData).pipe(
    //   map((response) => response.data),
    //   catchError((err) => {
    //     throw new HttpException(
    //       'Error creating medication request',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }),
    // );
  }

  /**
   * Update an existing medication request in the FHIR API.
   *
   * @param {string} medicationRequestId - The ID of the medication request to update.
   * @param {any} updatedData - The new data for the medication request.
   * @returns {Observable} - An Observable that will emit the response data when the HTTP request is successful.
   * @throws {HttpException} - Throws an exception if an error occurs during the HTTP request.
   */
  updateMedicationRequest(medicationRequestId: string, updatedData: any) {
    // const url = `https://example.com/fhir/MedicationRequest/${medicationRequestId}`;
    // return this.httpService.put(url, updatedData).pipe(
    //   map((response) => response.data),
    //   catchError((err) => {
    //     throw new HttpException(
    //       'Error updating medication request',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }),
    // );
  }
}
