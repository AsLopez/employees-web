import {TestBed} from '@angular/core/testing';

import {EmployeeService} from './employee.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpRequestService} from "../shared/http-request/http-request.service";
import {HttpResponse} from "@angular/common/http";

describe('EmployeeService', () => {
  let service: EmployeeService;

  let requestService: HttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmployeeService);
    requestService = TestBed.inject(HttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getEmployees method and return json data with employees', async () => {
    jest.spyOn(requestService, 'get').mockReturnValue(Promise.resolve(new HttpResponse<any>({body: MOCKS_DATA})));
    const result = await service.getEmployees();
    expect(result).toBe(MOCKS_DATA);
  });

  it('should call getEmployees method and return an exception', async () => {
    jest.spyOn(requestService, 'get').mockReturnValue(Promise.reject());
    service.getEmployees().catch(err => {
      expect(err).toBeUndefined();
    });
  });

  it('should call getEmployeeById method and return json data with an employee', async () => {
    jest.spyOn(requestService, 'get').mockReturnValue(Promise.resolve({body: MOCKS_DATA[0]}));
    const result = await service.getEmployeeById(2);
    expect(result).toBe(MOCKS_DATA[0]);
  });

  it('should call getEmployeeById method and return an exception', async () => {
    jest.spyOn(requestService, 'get').mockReturnValue(Promise.reject());
    await service.getEmployeeById(2).catch(err => {
      expect(err).toBeUndefined();
    });
  });
});


const MOCKS_DATA = [
  {
    "id": 1,
    "employee_name": "Tiger Nixon",
    "employee_salary": 3849600,
    "employee_age": 61,
    "profile_image": ""
  },
  {
    "id": 2,
    "employee_name": "Garrett Winters",
    "employee_salary": 2049000,
    "employee_age": 63,
    "profile_image": ""
  }
];
