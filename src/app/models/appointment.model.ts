import { PatientModel } from "./patient.model";
import { DepartmentModel, DoctorModel } from "./doctor.model";

export class AppointmentModel {
    id: string = "";
    startDate: string = "";
    endDate: string = "";
    patient: PatientModel = new PatientModel();
    doctor: DoctorModel = new DoctorModel();
    department: DepartmentModel = new DepartmentModel();
}
