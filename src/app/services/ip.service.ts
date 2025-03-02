import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  private apiUrl = 'https://api.ipify.org?format=json';
  private postIpUrl = `${environment.apiUrl}/ip`;

  constructor(private http: HttpClient) { }

  // Método para obtener la IP
  getIp(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para guardar la IP en la base de datos
  postIp(ip: string, fecha: string): Observable<any> {
    const data = { ip, fecha };  // Datos a enviar al backend
    return this.http.post(`${this.postIpUrl}/address`, data);
  }
}

