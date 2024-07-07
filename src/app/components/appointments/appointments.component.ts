import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { PatientModel } from '../../models/patient.model';
import { AppointmentModel } from '../../models/appointment.model';
import { DoctorModel } from '../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FormValidateDirective } from 'form-validate-angular';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { AppointmentPipe } from "../../pipe/appointment.pipe";

@Component({
    selector: 'app-appointments',
    standalone: true,
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.component.css'],
    imports: [CommonModule, RouterLink, FormsModule, FormValidateDirective, AppointmentPipe]
})
export class AppointmentsComponent implements OnInit {
  appointments: AppointmentModel[] = [];
  patients: PatientModel[] = [];
  doctors: DoctorModel[] = [];
  
  @ViewChild("addModalCloseBtn") addModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

  createModel: AppointmentModel = new AppointmentModel();
  updateModel: AppointmentModel = new AppointmentModel();

  search: string = '';

  constructor(
    private http: HttpService,
    private swal: SwalService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
    this.getAllPatients();
    this.getAllDoctors();
  }
getFullName(doctor: any): string {
        return `${doctor.firstName} ${doctor.lastName}`;
    }
  getAllAppointments() {
    this.http.post<AppointmentModel[]>("Appointments/GetAll", {}, (res) => {
      this.appointments = res.data;
    });
  }

  getAllPatients() {
    this.http.post<PatientModel[]>("Patients/GetAll", {}, (res) => {
      this.patients = res.data;
    });
  }

  getAllDoctors() {
    this.http.post<DoctorModel[]>("Doctors/GetAll", {}, (res) => {
      this.doctors = res.data;
    });
  }

 

  get(appointment: AppointmentModel) {
    this.updateModel = { ...appointment };
  }

 

  delete(id: string, fullName: string){
    this.swal.callSwal("Delete appointment?",`You want to delete ${fullName}?`,()=> {
      this.http.post<string>("Appointments/DeleteById", {id: id}, (res)=> {
        this.swal.callToast(res.data,"info");
        this.getAllAppointments();
      })
    })
  }

  trackById(index: number, item: AppointmentModel) {
    return item.id;
  }
}
