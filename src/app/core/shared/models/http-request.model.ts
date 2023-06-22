import {ApiDomain} from "../enums/api-domain.enum";
import {environment} from "../../../../environments/environment";

export interface HttpRequestInfo {
  url: string;
  body: any;
  headers: { [header: string]: string };
}

export class HttpRequestParams {
  body: any = null;
  headers: Map<string, string> = new Map();
  endpoint = environment.endpoints.employeeApi;
  apiDomain: ApiDomain = ApiDomain.None;
  path: string = '';
  queryParams?: { [key: string]: string } = undefined;
  useExternalEndpoint = false;
  includeAuthenticatorTokenValidation = false;
}
