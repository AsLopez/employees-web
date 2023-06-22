import {Injectable} from '@angular/core';
import {HttpRequestService} from "../shared/http-request/http-request.service";
import {HttpRequestParamsBuilder} from "../shared/utils/http-request-params-builder.service";
import {ApiDomain} from "../shared/enums/api-domain.enum";
import {API_PATHS} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private readonly httpRequestService: HttpRequestService) {
  }

  async getEmployees(): Promise<any> {
    try {
      const response = await this.httpRequestService.get(
        new HttpRequestParamsBuilder(ApiDomain.Company, API_PATHS.employees)
          .build()
      );
      return Promise.resolve(response.body);
    } catch (err) {
      return Promise.reject();
    }
  }

  async getEmployeeById(employeeId: number): Promise<any> {
    try {
      const response = await this.httpRequestService.get<any>(
        new HttpRequestParamsBuilder(ApiDomain.Company, API_PATHS.employeeById.replace('{id}', String(employeeId)))
          .build()
      );
      return Promise.resolve(response.body);
    } catch (err) {
      return Promise.reject();
    }
  }
}
