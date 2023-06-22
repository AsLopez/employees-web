import {Component} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DialogComponent} from "./core/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeService} from "./core/services/employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employees-web';
  columns = ['id', 'name', 'salary', 'age'];
  employees: any;
  dataSource: any;
  filterValue: any;

  constructor(
    private readonly employeeService: EmployeeService,
    public dialog: MatDialog) {
  }

  async ngOnInit() {
    this.employees = await this.getAllEmployees();
    this.updateTableData();
    /*this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.id == filter;
    };*/
  }

  /*applyFilter() {
    this.dataSource.filter = this.filterValue.toString();
  }*/


  async applyFilter() {
    this.employees = [];
    if (this.filterValue.length === 0 ) {
      this.employees = await this.getAllEmployees();
    } else {
      this.employees = await this.getEmployeeById(this.filterValue);
    }
    console.log('PREVIO A CARGAR DATA', this.employees);
    await this.updateTableData();
  }

  async setFilterValue(inputValue: any) {
    this.filterValue = inputValue.target.value;
    this.filterValue = this.filterValue.trim();
  }

  /*async setFilterValue(inputValue: any) {
    this.filterValue = inputValue.target.value;
    this.filterValue = this.filterValue.trim();
    if (this.filterValue.length === 0) {
      this.applyFilter();
    }
  }*/

  openDialog() {
    this.dialog.open(DialogComponent, {restoreFocus: false});
  }

  private async getAllEmployees() {
    return await this.employeeService.getEmployees();
  }

  private async getEmployeeById(employeeId: number) {
    try {
      return [await this.employeeService.getEmployeeById(employeeId)];
    } catch {
      return [];
    }
  }

  private updateTableData(){
    this.dataSource = new MatTableDataSource(this.employees);
  }
}
