import {Inject, Injectable} from '@angular/core';
import {HttpRequestParams} from "../models/http-request.model";
import {ApiDomain} from "../enums/api-domain.enum";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestParamsBuilder {
  private readonly httpRequestParams!: HttpRequestParams;

  constructor(apiDomain: ApiDomain, @Inject(String) path: string) {
    this.httpRequestParams = new HttpRequestParams();
    this.httpRequestParams.apiDomain = apiDomain;
    this.httpRequestParams.path = path;
  }

  build(): HttpRequestParams {
    return Object.assign({}, this.httpRequestParams);
  }

  /**
   * Add body payload to the http request
   * @param body http request body payload
   */
  withBody(body: any): HttpRequestParamsBuilder {
    this.httpRequestParams.body = body;
    return this;
  }

  /**
   * Add the API domain for the http request
   * @param apiDomain The API domain of the request
   */
  withApiDomain(apiDomain: ApiDomain): HttpRequestParamsBuilder {
    this.httpRequestParams.apiDomain = apiDomain;
    return this;
  }

  /**
   * overrides the endpoint to call a external endpoint
   * @param endpoint external endpoint URI
   */
  useExternalEndpoint(endpoint: string): HttpRequestParamsBuilder {
    this.httpRequestParams.endpoint = endpoint;
    this.httpRequestParams.apiDomain = ApiDomain.None;
    this.httpRequestParams.useExternalEndpoint = true;
    return this;
  }

  /**
   * Add additional headers to the http request
   * @param headers additional headers to the http request
   */
  withAdditionalHeaders(headers: Map<string, string>): HttpRequestParamsBuilder {
    this.httpRequestParams.headers = headers;
    return this;
  }

  /**
   * Additional query params for http request
   * @param queryParams additional query string param for the request
   */
  withQueryParams(queryParams: { [key: string]: string }): HttpRequestParamsBuilder {
    this.httpRequestParams.queryParams = queryParams;
    return this;
  }

  /**
   * Add the headers to use the authenticator access token
   */
  includeAuthenticatorTokenValidation(): HttpRequestParamsBuilder {
    this.httpRequestParams.includeAuthenticatorTokenValidation = true;
    return this;
  }
}
