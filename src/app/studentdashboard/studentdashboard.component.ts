import { Student } from './student.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {

  student: Student = new Student(); 
  formValue !: FormGroup;
  getAllStudents:any;

  showAdd! :boolean;
  showUpdate! :boolean;

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      secondName: [''],
      email: [''],
      phoneNumber: [''],
      studentFees: ['']

    })
    this.getAllStudent();
  }
  clickAddStudent(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postStudentDetails(){
    this.student.firstName = this.formValue.value.firstName;
    this.student.secondName = this.formValue.value.secondName;
    this.student.email = this.formValue.value.email;
    this.student.phoneNumber = this.formValue.value.phoneNumber;
    this.student.studentFees = this.formValue.value.studentFees;
    this.api.postStudent(this.student).subscribe(res => {
      this.formValue.reset();
    },err => {
      alert("something went wrong")
    })
  }
  getAllStudent(){
    this.api.getStudent().subscribe(res =>{
      this.getAllStudents = res;
    })
  }
  deleteStudents(data:any){
    this.api.deleteStudent(data.id).subscribe(res =>{
      alert(data.id + "student id deleted");
      this.getAllStudent();
    })
  }

  onEdit(data:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.student.id = data.id;
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['secondName'].setValue(data.secondName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phoneNumber'].setValue(data.phoneNumber);
    this.formValue.controls['studentFees'].setValue(data.studentFees);
  }

  updateStudents(){
    this.student.firstName = this.formValue.value.firstName;
    this.student.secondName = this.formValue.value.secondName;
    this.student.email = this.formValue.value.email;
    this.student.phoneNumber = this.formValue.value.phoneNumber;
    this.student.studentFees = this.formValue.value.studentFees;
    this.api.updateStudent(this.student,this.student.id).subscribe(res =>{
      alert(this.student.id + " updated");
      this.formValue.reset();
      this.getAllStudent();
    })
  }
}
