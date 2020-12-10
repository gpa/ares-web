import axios, { AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '@/environment/environment';

export class HttpApi {
  protected static client(authToken?: string) {
    let config: AxiosRequestConfig = {
      baseURL: ApiBaseUrl,
      responseType: 'json',
      validateStatus: status => status < 500
    };
    if (authToken) config.headers = { Authorization: `Bearer ${authToken}` };
    return axios.create(config);
  }
}
