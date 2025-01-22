import { TestBed } from '@angular/core/testing';
import { EmployeeService, Employee } from './employee.service';
import { of } from 'rxjs';

describe('EmployeeService', () => {
  let service: EmployeeService;
  const mockStorageKey = 'employees';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getEmployees', () => {
    it('should return an empty array if no employees are in localStorage', (done) => {
      service.getEmployees().subscribe((employees) => {
        expect(employees).toEqual([]);
        done();
      });
    });

    it('should return the employees stored in localStorage', (done) => {
      const mockEmployees: Employee[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', hireDate: '2023-01-01' },
      ];
      localStorage.setItem(mockStorageKey, JSON.stringify(mockEmployees));

      service.getEmployees().subscribe((employees) => {
        expect(employees).toEqual(mockEmployees);
        done();
      });
    });
  });

  describe('#getEmployeeById', () => {
    it('should return the correct employee by ID', (done) => {
      const mockEmployees: Employee[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', hireDate: '2023-01-01' },
      ];
      localStorage.setItem(mockStorageKey, JSON.stringify(mockEmployees));

      service.getEmployeeById(1).subscribe((employee) => {
        expect(employee).toEqual(mockEmployees[0]);
        done();
      });
    });

    it('should return undefined if the employee is not found', (done) => {
      service.getEmployeeById(999).subscribe((employee) => {
        expect(employee).toBeUndefined();
        done();
      });
    });
  });

  describe('#addEmployee', () => {
    it('should add a new employee to localStorage', (done) => {
      const newEmployee: Employee = { id: 1, name: 'John Doe', email: 'john@example.com', hireDate: '2023-01-01' };

      service.addEmployee(newEmployee).subscribe((success) => {
        expect(success).toBeTrue();

        const storedEmployees = JSON.parse(localStorage.getItem(mockStorageKey) || '[]');
        expect(storedEmployees).toContain(newEmployee);
        done();
      });
    });
  });

  describe('#updateEmployee', () => {
    it('should update an existing employee in localStorage', (done) => {
      const mockEmployees: Employee[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', hireDate: '2023-01-01' },
      ];
      localStorage.setItem(mockStorageKey, JSON.stringify(mockEmployees));

      const updatedEmployee: Employee = { id: 1, name: 'Jane Doe', email: 'jane@example.com', hireDate: '2023-01-01' };

      service.updateEmployee(updatedEmployee).subscribe((success) => {
        expect(success).toBeTrue();

        const storedEmployees = JSON.parse(localStorage.getItem(mockStorageKey) || '[]');
        expect(storedEmployees[0]).toEqual(updatedEmployee);
        done();
      });
    });

    it('should return false if the employee is not found', (done) => {
      const updatedEmployee: Employee = { id: 999, name: 'Unknown', email: 'unknown@example.com', hireDate: '2023-01-01' };

      service.updateEmployee(updatedEmployee).subscribe((success) => {
        expect(success).toBeFalse();
        done();
      });
    });
  });

  describe('#deleteEmployee', () => {
    it('should delete the employee with the given ID', (done) => {
      const mockEmployees: Employee[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', hireDate: '2023-01-01' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com', hireDate: '2023-02-01' },
      ];
      localStorage.setItem(mockStorageKey, JSON.stringify(mockEmployees));

      service.deleteEmployee(1).subscribe((success) => {
        expect(success).toBeTrue();

        const storedEmployees = JSON.parse(localStorage.getItem(mockStorageKey) || '[]');
        expect(storedEmployees.length).toBe(1);
        expect(storedEmployees[0].id).toBe(2);
        done();
      });
    });

    it('should return true even if the employee is not found', (done) => {
      service.deleteEmployee(999).subscribe((success) => {
        expect(success).toBeTrue();
        done();
      });
    });
  });
});
