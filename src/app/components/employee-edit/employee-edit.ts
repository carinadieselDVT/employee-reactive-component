import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DEPARTMENTS, AVAILABLE_SKILLS } from '../../models/skills.constants';
import { Experience } from '../../models/employee.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css',
})
export class EmployeeEdit implements OnInit {
  public readonly departments = DEPARTMENTS;
  public readonly skills = AVAILABLE_SKILLS;
  employee = inject(EmployeeService);

  fb: FormBuilder = inject(FormBuilder);

  employeeForm!: FormGroup;

  private buildForm() {
    this.employeeForm = this.fb.group({
      id: new FormControl('', Validators.required),
      name: new FormControl(''),
      email: new FormControl('', Validators.required),
      department: new FormControl(''),
      isActive: new FormControl(''),
      skills: this.fb.array(this.skills.map(() => new FormControl(false))),
      experiences: this.fb.array([]),
    });
  }

  private createExperienceGroup(xp: Experience): FormGroup {
    return this.fb.group({
      company: [xp.company],
      role: [xp.role],
      years: [xp.years],
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.employee.getEmployee(1).subscribe((employee) => {
      this.employeeForm.patchValue(employee);
      const skillsArray = this.employeeForm.get('skills') as FormArray;
      this.skills.forEach((skill, i) => {
        skillsArray.at(i).setValue(employee.skills.includes(skill));
      });
      const experiencesArray = this.employeeForm.get('experiences') as FormArray;
      employee.experiences.forEach((xp) => {
        experiencesArray.push(this.createExperienceGroup(xp));
      });
    });
  }

  get experiencesArray(): FormArray {
    return this.employeeForm.get('experiences') as FormArray;
  }

  onSubmit(): void {}
}
