import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: "root"
})
export class Servicios {
  constructor(private http: HttpClient,
  ) {
  }



  apiURL: string = "http://localhost:3001/api/"
  guardarRepertorio(canciones: string[]) {
    return this.http.post(this.apiURL + 'repertorio', canciones);

  }

  obtenerRepertorio() {
    return this.http.get<string[]>(this.apiURL + 'repertorio');
  }


  obtenerUrlImagen(nombre: string): string {
    return this.apiURL + 'images/file/' + nombre;
  }

  buscarImagenes(query: string) {
    return this.http.get<string[]>(this.apiURL + 'images?q=' + query);
  }


  obtenerRepertorioConImagenes() {
    return this.obtenerRepertorio().pipe(
      switchMap(nombres => {
        const busquedas = nombres.map(nombre => this.buscarImagenes(nombre));

        return forkJoin(busquedas);
      }
      ),
      map(resultados => {
        console.log("Resultados:", resultados);
        return resultados.map(canciones => canciones[0]).filter(Boolean);
      })
    )
  }
}
