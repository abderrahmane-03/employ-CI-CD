import { Component, Input } from '@angular/core';
import { Employee } from '../../services/employee.service';
import {DateFormatPipe} from '../../../pipes/date-format.pipe';
import {HighlightDirective} from '../../../directives/highlight.directive';


@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [DateFormatPipe, HighlightDirective],
  template: `
    <div appHighlight="yellow">
      <p>{{ employee.name }}</p>
      <p>{{ employee.email }}</p>
      <p>{{ employee.hireDate | dateFormat }}</p>
    </div>
  `,
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;
}
