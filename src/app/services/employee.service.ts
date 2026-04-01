import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

/**
 * EmployeeService
 *
 * Mocks an HTTP API for employee data.
 * HttpClient is injected to demonstrate real-world service patterns,
 * but all methods return local mock data wrapped in `of()` with a simulated delay.
 *
 * In a production app, replace `of(mockData)` with actual `this.http.get/put` calls.
 */
@Injectable({ providedIn: 'root' })
export class EmployeeService {
  // Base URL — not used in mock, but shows where the real endpoint would go
  private readonly apiUrl = '/api/employees';

  private mockEmployee: Employee = {
    id: 1,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Engineering',
    isActive: true,
    skills: ['TypeScript', 'Angular', 'CSS'],
    experiences: [
      { company: 'Acme Corp', role: 'Junior Developer', years: 2 },
      { company: 'Tech Startup', role: 'Frontend Developer', years: 3 },
    ],
  };

  // HttpClient is injected to reflect real-world patterns.
  // Even though we mock responses here, the service is structured so you
  // can swap `of(...)` for `this.http.get(...)` with minimal changes.
  constructor(private http: HttpClient) {}

  /**
   * Fetch an employee by ID.
   * Simulates a 600ms network delay.
   *
   * Real implementation would be:
   *   return this.http.get<Employee>(`${this.apiUrl}/${id}`);
   */
  getEmployee(id: number): Observable<Employee> {
    console.log(`[EmployeeService] GET /api/employees/${id} (mocked)`);
    return of({ ...this.mockEmployee, experiences: [...this.mockEmployee.experiences] }).pipe(
      delay(600)
    );
  }

  /**
   * Save (PUT) an updated employee.
   * Simulates a 400ms network delay and updates the local mock store.
   *
   * Real implementation would be:
   *   return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
   */
  saveEmployee(employee: Employee): Observable<Employee> {
    console.log(`[EmployeeService] PUT /api/employees/${employee.id} (mocked)`, employee);
    this.mockEmployee = { ...employee };
    return of({ ...this.mockEmployee }).pipe(
      delay(400),
      tap(() => console.log('[EmployeeService] Save successful'))
    );
  }
}
