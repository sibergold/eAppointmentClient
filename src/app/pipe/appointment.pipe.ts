import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentModel } from '../models/appointment.model';


@Pipe({
  name: 'appointment',
  standalone: true
})
export class AppointmentPipe implements PipeTransform {

  transform(value: AppointmentModel[], search: string): AppointmentModel[] {
    if(!search){
      return value;
    }
    return value.filter(p=>
      p.startDate.toLocaleLowerCase().includes(search) ||
      p.endDate.toLocaleLowerCase().includes(search) || 
      p.patient.fullName.toLocaleLowerCase().includes(search) || 
      this.getFullName(p.doctor).toLocaleLowerCase().includes(search)
      
    )
  }
  getFullName(doctor: any): string {
    return `${doctor.firstName} ${doctor.lastName}`;
}
  }

  

