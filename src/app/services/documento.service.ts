import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private apiUrl = `${environment.apiUrl}/documento`;

  constructor(private http: HttpClient) { }

  // Método para validar el código
  validarCodigo(codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/validar/${codigo}`);
  }

  // Método para obtener los datos del documento
  obtenerDatos(codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/datos/${codigo}`);
  }
}

