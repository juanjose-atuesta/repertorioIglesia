import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: "root"
})
export class Servicios {
  constructor(private http: HttpClient) {}

  apiURL: string = "http://localhost:3001/api/"

  guardarRepertorio(canciones: string[]) {
    return this.http.post(this.apiURL + 'repertorio', canciones);
  }

  obtenerRepertorio() {
    return this.http.get<string[]>(this.apiURL + 'repertorio');
  }

  buscarImagenes(query: string) {
    return this.http.get<string[]>(this.apiURL + 'images', { params: { q: query } });
  }

  obtenerUrlImagen(archivo: string): string {
    return this.apiURL + 'images/file/' + archivo;
  }
}
