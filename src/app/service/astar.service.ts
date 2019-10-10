import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AstarService {
  server = environment.server;
  constructor(private http: HttpClient) { }

  aSearch(data: any) {
    return this.http.post(`${this.server}/aSearch`, data);
  }
}
