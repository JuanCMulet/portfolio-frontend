import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = "http://localhost:8080"

  constructor(
    private http:HttpClient
  ) { }

  getData(data: string):Observable<any> {
    return this.http.get(this.apiUrl+"/ver/"+data)
  }

  deleteItem(data: string, item: any): Observable<any> {
    const url = `${this.apiUrl}/delete/${data}/${item.id}`;
    return this.http.delete<any>(url);
  }

  addItem(data: string, item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/new/"+data, item, httpOptions);
  }

  updateItem(data: string, item: any): Observable<any> {
    const url = `${this.apiUrl}/cambiar/${data}/${item.id}`;
    return this.http.put<any>(url, item, httpOptions);
  }

}
