// Define PatientRecord interface
interface PatientRecord {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
}

// Define PatientRecordManager as a singleton class
class PatientRecordManager {
  // Define private static instance
  private static instance: PatientRecordManager;

  // Define private static patientRecords
  private patientRecords: PatientRecord[] = [];

  // Define private constructor
  private constructor() {}

  // Define static getInstance method to get the instance of the class
  public static getInstance(): PatientRecordManager {
    // Check if instance is not defined
    if (!PatientRecordManager.instance) {
      // Create new instance
      PatientRecordManager.instance = new PatientRecordManager();
    }
    // Return instance if already defined
    return PatientRecordManager.instance;
  }

  // Define addPatientRecord method to add patient record
  public addPatientRecord(patientRecord: PatientRecord): void {
    // Check if patient record is already added
    if (this.patientRecords.some((record) => record.id === patientRecord.id)) {
      console.log(`Patient record with id ${patientRecord.id} already exists`);
      return;
    }

    // Add patient record
    this.patientRecords.push(patientRecord);
    console.log(
      `Patient record with id ${patientRecord.id} added successfully`
    );
  }

  // Define updatePatientRecord method to update patient record
  public updatePatientRecord(patientRecord: PatientRecord): void {
    const index = this.patientRecords.findIndex(
      (record) => record.id === patientRecord.id
    );
    if (index === -1) {
      console.log(`Patient record with id ${patientRecord.id} does not exists`);
      return;
    }

    // Update patient record
    this.patientRecords[index] = patientRecord;
    console.log(
      `Patient record with id ${patientRecord.id} updated successfully`
    );
  }

  // Define getPatientRecordById method to get patient record by id
  public getPatientRecordById(id: number): PatientRecord | undefined {
    return this.patientRecords.find((record) => record.id === id);
  }

  // Define getAllPatientRecords method to get all patient records
  public getAllPatientRecords(): PatientRecord[] {
    return this.patientRecords;
  }
}

// Usage
const doctor = PatientRecordManager.getInstance();
const nurse = PatientRecordManager.getInstance();

// Add patient records
doctor.addPatientRecord({
  id: 1,
  name: "John Doe",
  age: 25,
  diagnosis: "Fever",
});
nurse.addPatientRecord({
  id: 2,
  name: "Jane Doe",
  age: 30,
  diagnosis: "Headache",
});

// Update patient records
doctor.updatePatientRecord({
  id: 1,
  name: "John Doe",
  age: 25,
  diagnosis: "Cold",
});

// Check if both instances are same
console.log("Is doctor same as nurse?", doctor === nurse);

// Get all patient records
console.log("All patient records:");
console.log(doctor.getAllPatientRecords());
