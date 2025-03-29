enum RequestStage {
  Reception,
  Diagnosis,
  Treatment,
  Consultation,
  Done,
}

class Patient {
  constructor(
    private patientId: number,
    private name: string,
    private symptoms: string
  ) {}

  public getInfo(): string {
    return `Patient ID: ${this.patientId}, Name: ${this.name}, Symptoms: ${this.symptoms}`;
  }
}

class PatientRequest {
  private stage: RequestStage;

  constructor(private patient: Patient, initialStage: RequestStage) {
    this.stage = initialStage;
  }

  public getPatient(): Patient {
    return this.patient;
  }

  public getStage(): RequestStage {
    return this.stage;
  }

  public setStage(newStage: RequestStage): void {
    this.stage = newStage;
  }
}

interface Handler {
  setNextHandler(handler: Handler): Handler;
  handleRequest(request: PatientRequest): void;
}

class ReceptionHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNextHandler(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handleRequest(request: PatientRequest): void {
    if (request.getStage() === RequestStage.Reception) {
      console.log(`[ReceptionHandler]: ${request.getPatient().getInfo()}`);
      request.setStage(RequestStage.Diagnosis);
    }
    if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    }
  }
}

class DiagnosisHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNextHandler(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handleRequest(request: PatientRequest): void {
    if (request.getStage() === RequestStage.Diagnosis) {
      console.log(`[DiagnosisHandler]: ${request.getPatient().getInfo()}`);
      request.setStage(RequestStage.Treatment);
    }
    if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    }
  }
}

class TreatmentHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNextHandler(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handleRequest(request: PatientRequest): void {
    if (request.getStage() === RequestStage.Treatment) {
      console.log(`[TreatmentHandler]: ${request.getPatient().getInfo()}`);
      request.setStage(RequestStage.Consultation);
    }
    if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    }
  }
}

class ConsultationHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNextHandler(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handleRequest(request: PatientRequest): void {
    if (request.getStage() === RequestStage.Consultation) {
      console.log(`[ConsultationHandler]: ${request.getPatient().getInfo()}`);
      request.setStage(RequestStage.Done);
    }
  }
}

class HospitalClient {
  private handlerChain: Handler;

  constructor() {
    const reception = new ReceptionHandler();
    const diagnosis = new DiagnosisHandler();
    const treatment = new TreatmentHandler();
    const consultation = new ConsultationHandler();

    reception
      .setNextHandler(diagnosis)
      .setNextHandler(treatment)
      .setNextHandler(consultation);

    this.handlerChain = reception;
  }

  public processRequest(request: PatientRequest): void {
    this.handlerChain.handleRequest(request);
  }
}

const patient = new Patient(1, "John Doe", "Fever");
const request = new PatientRequest(patient, RequestStage.Reception);

const hospitalClient = new HospitalClient();
hospitalClient.processRequest(request);
