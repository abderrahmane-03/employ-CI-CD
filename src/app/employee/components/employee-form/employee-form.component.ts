import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  employee: Employee = { id: 0, name: '', email: '', hireDate: '' };
  isEditMode = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployeeById(+id).subscribe((existingEmployee) => {
        if (existingEmployee) {
          this.employee = { ...existingEmployee };
          this.initializeForm();
        } else {
          this.router.navigate(['/employees']); // Redirect if not found
        }
      });
    } else {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.employeeForm = this.fb.group({
      name: [this.employee.name, [Validators.required]],
      email: [this.employee.email, [Validators.required, Validators.email]],
      hireDate: [this.employee.hireDate, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      if (this.isEditMode) {
        this.employeeService.updateEmployee({ ...employeeData, id: this.employee.id }).subscribe({
          next: () => this.router.navigate(['/employees']),
          error: (err) => console.error('Error updating employee', err),
        });
      } else {
        const newEmployee = { ...employeeData, id: Date.now() };
        this.employeeService.addEmployee(newEmployee).subscribe({
          next: () => this.router.navigate(['/employees']),
          error: (err) => console.error('Error adding employee', err),
        });
      }
    }
  }
}
