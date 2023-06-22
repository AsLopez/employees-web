import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpRequestInfo, HttpRequestParams} from "../models/http-request.model";

/**
 * Wrapper service responsible to make the http requests. It add the needed headers for each API Domain
 */
@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private readonly http: HttpClient) {}

  async get<T>(requestParams: HttpRequestParams): Promise<any> {
    const httpRequestInfo = await this.getHttpRequestInfo(requestParams);
    return this.http
      .get<T>(httpRequestInfo.url, { headers: httpRequestInfo.headers, observe: 'response', params: requestParams.queryParams })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        this.handleError(requestParams, httpRequestInfo, error);
        throw error;
      });
  }

  async post<T>(requestParams: HttpRequestParams): Promise<HttpResponse<T> | undefined | void> {
    const httpRequestInfo = await this.getHttpRequestInfo(requestParams);
    return this.http
      .post<T>(httpRequestInfo.url, httpRequestInfo.body, {
        headers: httpRequestInfo.headers,
        observe: 'response',
        params: requestParams.queryParams,
      })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        this.handleError(requestParams, httpRequestInfo, error);
        throw error;
      });
  }

  async put<T>(requestParams: HttpRequestParams): Promise<HttpResponse<T> | undefined | void> {
    const httpRequestInfo = await this.getHttpRequestInfo(requestParams);
    return this.http
      .put<T>(httpRequestInfo.url, httpRequestInfo.body, {
        headers: httpRequestInfo.headers,
        observe: 'response',
        params: requestParams.queryParams,
      })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        this.handleError(requestParams, httpRequestInfo, error);
        throw error;
      });
  }

  async delete<T>(requestParams: HttpRequestParams): Promise<HttpResponse<T> | undefined | void> {
    const httpRequestInfo = await this.getHttpRequestInfo(requestParams);
    return this.http
      .delete<T>(httpRequestInfo.url, { headers: httpRequestInfo.headers, observe: 'response' })
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        this.handleError(requestParams, httpRequestInfo, error);
        throw error;
      });
  }

  private async getHttpRequestInfo(httpRequestParams: HttpRequestParams): Promise<HttpRequestInfo> {
    return await this.prepareRequest(httpRequestParams);
  }

  private handleError(httpRequestParams: HttpRequestParams, httpRequestInfo: HttpRequestInfo, error: HttpErrorResponse): void {
    console.error('FAIL-REQUEST: endpoint', httpRequestParams.endpoint, ' - INFO: ', httpRequestInfo.body, ' - ERROR: ', error);
  }


  private async prepareRequest(requestParams: HttpRequestParams): Promise<HttpRequestInfo> {
    const url = this.createUrl(requestParams);
    const headers = await this.createRequestHeaders(requestParams);
    return {
      url,
      body: requestParams.body,
      headers,
    };
  }

  private createUrl(requestParams: HttpRequestParams): string {
    return requestParams.endpoint.concat(requestParams.apiDomain).concat(requestParams.path);
  }

  private async createRequestHeaders(requestParams: HttpRequestParams): Promise<{ [header: string]: string }> {
    let headers: { [header: string]: string } = {};
    if (requestParams.headers.size) {
      requestParams.headers.forEach((value, key) => (headers[key] = value));
    }
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json; charset=UTF-8';

    return headers;
  }
}
