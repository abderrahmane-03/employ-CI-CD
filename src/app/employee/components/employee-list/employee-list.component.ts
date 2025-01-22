import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, EmployeeCardComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'], // Corrected the typo
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = true; // To display a loading indicator if needed
  error: string | null = null; // For error feedback

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  /**
   * Load employees from the service
   */
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false; // Set loading to false once data is fetched
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.error = 'Failed to load employees. Please try again later.';
        this.loading = false;
      },
    });
  }

  /**
   * Navigate to the edit page for a specific employee
   * @param id Employee ID
   */
  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  /**
   * Delete an employee and refresh the list
   * @param id Employee ID
   */
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees(); // Refresh the list after successful deletion
      },
      error: (err) => {
        console.error('Error deleting employee:', err);
        this.error = 'Failed to delete employee. Please try again later.';
      },
    });
  }
}
