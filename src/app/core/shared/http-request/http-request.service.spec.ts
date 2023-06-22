import {TestBed} from '@angular/core/testing';

import {HttpRequestService} from './http-request.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {HttpRequestParams} from "../models/http-request.model";
import {of} from "rxjs";

describe('HttpRequestService', () => {
  let service: HttpRequestService;
  let httpClientMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpRequestService);
    httpClientMock = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get method and return success response', async () => {
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(true));
    const result = await service.get(new HttpRequestParams());
    expect(result).toBeTruthy();
  });

  it('should call post method and return success response', async () => {
    jest.spyOn(httpClientMock, 'post').mockReturnValue(of(true));
    const result = await service.post(new HttpRequestParams());
    expect(result).toBeTruthy();
  });

  it('should call put method and return success response', async () => {
    jest.spyOn(httpClientMock, 'put').mockReturnValue(of(true));
    const result = await service.put(new HttpRequestParams());
    expect(result).toBeTruthy();
  });

  it('should call delete method and return success response', async () => {
    jest.spyOn(httpClientMock, 'delete').mockReturnValue(of(true));
    const result = await service.delete(new HttpRequestParams());
    expect(result).toBeTruthy();
  });
});
