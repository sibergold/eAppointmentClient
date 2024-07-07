export class DoctorModel{
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = `${this.firstName} ${this.lastName}`;
    department: DepartmentModel = new DepartmentModel();
    departmentValue: number = 0;
}

export class DepartmentModel{
    name: string = "";
    value: number = 0;
}