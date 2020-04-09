import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private http: HttpClient) { }

  getAllArticles(userId: string) {
    return this.http.get<any>(`${environment.BACKEND_SERVICE}/news/articles/${userId}`);
  }

  getAllSources(userId: string) {
    return this.http.get<any>(`${environment.BACKEND_SERVICE}/news/sources/${userId}`);
  }
}
