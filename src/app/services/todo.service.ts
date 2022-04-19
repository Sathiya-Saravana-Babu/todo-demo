import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const SERVER_URL: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(  private _httpClient: HttpClient,) { }

   /**
   * Universal get
   *
   * @returns {Promise<any>}
   */
    getData(controller:any): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.get(`${SERVER_URL}`+controller, {
          headers:
              new HttpHeaders(
                  {
                    'Content-type': 'application/json; charset=UTF-8',
                  }
              )
        })
        .subscribe((response: any) => {
            resolve(response);
        }, (response1: any) => {
            reject(response1);
        });
      });
    }

    /**
   * Universal post
   * @param params
   */

     postData(controller:any, data: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.post(`${SERVER_URL}`+controller, {...data}, {
          headers:
              new HttpHeaders(
                  {
                    'Content-type': 'application/json; charset=UTF-8',
                  }
              )
        })
        .subscribe((response: any) => {
            resolve(response);
        }, (response1: any) => {
            reject(response1);
        });
      });
    }

    putData(controller:any, data: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.put(`${SERVER_URL}`+controller, {...data}, {
          headers:
              new HttpHeaders(
                  {
                    'Content-type': 'application/json; charset=UTF-8',
                  }
              )
        })
        .subscribe((response: any) => {
            resolve(response);
        }, (response1: any) => {
            reject(response1);
        });
      });
    }

    deleteData(controller:any, data: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this._httpClient.delete(`${SERVER_URL}`+controller, {
          headers:
              new HttpHeaders(
                  {
                    'Content-type': 'application/json; charset=UTF-8',
                  }
              )
        })
        .subscribe((response: any) => {
            resolve(response);
        }, (response1: any) => {
            reject(response1);
        });
      });
    }
}
