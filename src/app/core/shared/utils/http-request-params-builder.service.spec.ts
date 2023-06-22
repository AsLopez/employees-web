import {HttpRequestParamsBuilder} from "./http-request-params-builder.service";
import {ApiDomain} from "../enums/api-domain.enum";

describe('HttpRequestParamsBuilderService', () => {
  let httpParamsBuilder: HttpRequestParamsBuilder;

  beforeEach(() => {
    httpParamsBuilder = new HttpRequestParamsBuilder(ApiDomain.None, 'localhost');
  });

  it('should add body data to request params', () => {
    httpParamsBuilder.withBody({hello: 'world'});
    const params = httpParamsBuilder.build();
    expect(params.body).toEqual({hello: 'world'});
  });

  it('should add ApiDomain data to request params', () => {
    httpParamsBuilder.withApiDomain(ApiDomain.Company);
    const params = httpParamsBuilder.build();
    expect(params.apiDomain).toBe(ApiDomain.Company);
  });

  it('should add external endpoint data to request params', () => {
    const endpoint = 'http://localhost';
    httpParamsBuilder.useExternalEndpoint(endpoint);
    const params = httpParamsBuilder.build();
    expect(params.useExternalEndpoint).toBe(true);
    expect(params.endpoint).toBe(endpoint);
    expect(params.apiDomain).toBe(ApiDomain.None);
  });

  it('should add additional headers data to request params', () => {
    const headers = new Map<string, string>();
    headers.set('hello', 'world');
    httpParamsBuilder.withAdditionalHeaders(headers);
    const params = httpParamsBuilder.build();
    expect(params.headers).toEqual(headers);
  });

  it('should add query params data to request params', () => {
    const queryParams = {hello: 'world'};
    httpParamsBuilder.withQueryParams(queryParams);
    const params = httpParamsBuilder.build();
    expect(params.queryParams).toEqual(queryParams);
  });

  it('should add Authenticator Access Token data to request params', () => {
    httpParamsBuilder.includeAuthenticatorTokenValidation();
    const params = httpParamsBuilder.build();
    expect(params.includeAuthenticatorTokenValidation).toBeTruthy();
  });
});
