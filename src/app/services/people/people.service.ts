import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPeople, IPersonDetail } from '../../model/people';
import { IServiceParams } from '../../model/service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  // todo: move to env
  private baseUrl = "https://swapi.dev/api";

  constructor(private http : HttpClient) { }

  getAll() : Observable<IPeople> {
    return this.http.get<IPeople>(`${this.baseUrl}/people`);
    // return this.apiService.Get(`${this.url}endpoint`)
  }

  get(params: IServiceParams) : Observable<IPeople> {
    return this.http.get<IPeople>(`${this.baseUrl}/people/`, {params: this.createParams(params)});
  }

  getById(id: number) : Observable<IPersonDetail> {
    return this.http.get<IPersonDetail>(`${this.baseUrl}/people/${id}`);
  }

  createParams(params?: IServiceParams) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if(value){
          httpParams = httpParams.append(key, value);
        }
      });
    }
    return httpParams;
  }
}
