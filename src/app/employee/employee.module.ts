import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  imports: [
    EmployeeListComponent, EmployeeFormComponent,
    CommonModule,
    EmployeeRoutingModule,
  ],
})
export class EmployeeModule {}
