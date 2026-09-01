import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CancionesConLetra } from './models';
import { forkJoin } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: "root"
})
export class Servicios {
  constructor(private http: HttpClient,
  ) {
  }



  //  apiURL: string = "https://backendiglesiaapi.juanjodev.win/api/";
  apiURL: string = "http://localhost:3002/api/";
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


  obtenerCancionesRepertorio() {
    return this.http.get<CancionesConLetra[]>(this.apiURL + "letras/repertorio");
  }

  buscarLetraCancion(nombreCancion: any) {
    return this.http.get<CancionesConLetra>(this.apiURL + "letras/buscar?nombre=" + nombreCancion);


  }

  guardarLetraCancion(cancion: string[]) {
    return this.http.post(this.apiURL + "letras", cancion);
  }


  obtenerCurrentSong() {
    return this.http.get<string>(this.apiURL + "currentSong");
  }
  guardarCurrentSong(cancion: string) {
    return this.http.post(this.apiURL + "setNewCurrentSong", { nombre: cancion });
  }

  cancionSeleccionada = signal("");
  actualizarCancionSeleccionada(nombre: string) {
    this.cancionSeleccionada.set(nombre);
  }

}
