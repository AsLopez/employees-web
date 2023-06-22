import {EnvironmentProvider} from "../app/core/shared/provider/environment.provider";

export const environment: EnvironmentProvider = {
  endpoints: {
    employeeApi: 'http://localhost:8080'
  },
  production: false
};

export const API_PATHS = {
  employees: '/employees',
  employeeById: '/employee/{id}',
};
