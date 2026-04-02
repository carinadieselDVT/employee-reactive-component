import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DEPARTMENTS, AVAILABLE_SKILLS } from '../../models/skills.constants';
import { EmployeeService } from '../../services/employee.service';
import { Experience } from '../../models/employee.model';

@Component({
  selector: 'app-employee-view',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-view.html',
  styleUrl: './employee-view.css',
})
export class EmployeeView implements OnInit {
  public readonly departments = DEPARTMENTS;
  public readonly skills = AVAILABLE_SKILLS;

  fb: FormBuilder = inject(FormBuilder);

  employeeForm!: FormGroup;

  employee = inject(EmployeeService);

  private buildForm() {
    this.employeeForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
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
      this.employeeForm.disable();
    });
  }

  get experiencesArray(): FormArray {
    return this.employeeForm.get('experiences') as FormArray;
  }
}
