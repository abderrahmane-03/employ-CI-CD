import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Employee {
  id: number;
  name: string;
  email: string;
  hireDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly storageKey = 'employees';

  getEmployees(): Observable<Employee[]> {
    return of(localStorage.getItem(this.storageKey)).pipe(
      map((employees) => (employees ? JSON.parse(employees) : [])),
      catchError(() => {
        console.error('Failed to fetch employees');
        return of([]);
      })
    );
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.getEmployees().pipe(
      map((employees) => employees.find((e) => e.id === id)),
      catchError(() => {
        console.error('Failed to fetch employee by ID');
        return of(undefined);
      })
    );
  }

  addEmployee(employee: Employee): Observable<boolean> {
    return this.getEmployees().pipe(
      map((employees) => {
        employees.push(employee);
        localStorage.setItem(this.storageKey, JSON.stringify(employees));
        return true;
      }),
      catchError(() => {
        console.error('Failed to add employee');
        return of(false);
      })
    );
  }

  updateEmployee(updatedEmployee: Employee): Observable<boolean> {
    return this.getEmployees().pipe(
      map((employees) => {
        const index = employees.findIndex((e) => e.id === updatedEmployee.id);
        if (index !== -1) {
          employees[index] = updatedEmployee;
          localStorage.setItem(this.storageKey, JSON.stringify(employees));
          return true;
        }
        return false;
      }),
      catchError(() => {
        console.error('Failed to update employee');
        return of(false);
      })
    );
  }

  deleteEmployee(id: number): Observable<boolean> {
    return this.getEmployees().pipe(
      map((employees) => {
        const updatedEmployees = employees.filter((e) => e.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(updatedEmployees));
        return true;
      }),
      catchError(() => {
        console.error('Failed to delete employee');
        return of(false);
      })
    );
  }
}
