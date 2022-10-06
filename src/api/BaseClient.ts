import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { errorMessages } from '../shared/enums/error-types';
import HttpStatusCode from '../shared/enums/http-codes';

export class BaseClient {
  static baseUrl = 'https://g11evfy2rr.apistubs.io'

  static get defaultOptions(): AxiosRequestConfig {
    return {
      withCredentials: true
    };
  }

  static async get<T>(url: string, options?: AxiosRequestConfig) {
    try {
      const response = await axios.get<T>(`${this.baseUrl}/${url}`, this.getOptions(options));
      return this.map(response);
    } catch (error: any) {
      return this.mapError(error);
    }
  }

  static async post<T, R = any>(url: string, data: T, options?: AxiosRequestConfig) {
    try {
      const response = await axios.post<T, AxiosResponse<R>>(`${this.baseUrl}/${url}`, data, this.getOptions(options));
      return this.map(response);
    } catch (error: any) {
      return this.mapError(error);
    }
  }

  static async put<T>(url: string, data: T, options?: AxiosRequestConfig) {
    try {
      const response = await axios.put<T>(`${this.baseUrl}/${url}`, data, this.getOptions(options));
      return this.map(response);
    } catch (error: any) {
      return this.mapError(error);
    }
  }

  static async patch<T>(url: string, data: T, options?: AxiosRequestConfig) {
    try {
      const response = await axios.patch<T>(`${this.baseUrl}/${url}`, data, this.getOptions(options));
      return this.map(response);
    } catch (error: any) {
      return this.mapError(error);
    }
  }

  static async delete<T>(url: string, params?: any[], options?: AxiosRequestConfig) {
    try {
      const response = await axios.delete<T>(`${this.baseUrl}/${url}`, this.getOptions(options));
      return this.map(response);
    } catch (error: any) {
      return this.mapError(error);
    }
  }

  static map<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  static mapError<T>(error: AxiosError<T>) {
    const unexpectedMessage = 'Произошла непредвиденная ошибка.';
    
    if (!error.response) {
      return Promise.reject({ message: error.message || unexpectedMessage });
    }

    const { data, status} = error.response;

    return Promise.reject({
      data: data,
      message: errorMessages[HttpStatusCode[status]],
      status: status
    });
  }

  static getOptions(options?: AxiosRequestConfig) {
    if (options) {
      options.withCredentials = true;

      return options;
    }

    return this.defaultOptions;
  }
}
