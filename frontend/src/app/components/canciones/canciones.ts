import { CommonModule } from '@angular/common';
import { Component, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Servicios } from '../../services/servicios/servicios';
import { signal } from '@angular/core'
@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-canciones',
  styleUrl: './canciones.css',
  templateUrl: './canciones.html',
})
export class Canciones implements OnInit {
  constructor(public servicios: Servicios) {

    effect(() => {
      const cancion = this.servicios.cancionSeleccionada(); // lee el dato

      if (cancion) {
        console.log('Reacciono al instante:', cancion);
        window.location.reload();
      }
      this.cancionActual.set(cancion);
    });
  }
  //repositorioActual = signal<string[]>([]);
  urlCancion = signal("");
  cancionActual = signal("");
  cancionBuscar: string = "";
  ngOnInit() {
    //this.obtenerRepertorioActual();
    this.servicios.obtenerCurrentSong().subscribe({
      next: cancion => {
        this.cancionActual.set(cancion);
      }
    })
  }
  /* esta funcion no se usa por ahora
    obtenerRepertorioActual() {
      this.servicios.obtenerRepertorioConImagenes().subscribe(
        {
          next: canciones => {
            this.repositorioActual.set(canciones);
            console.log("este es el repositorio de canciones", this.repositorioActual());
          },
          error: (err) => console.error("hubo un error", err)
        }
      );
    }

    */
  abrirEnNuevaPestana(url: string): void {
    window.open(url, '_blank');
  }


  buscarCancion(cancion: string) {

    this.urlCancion.set(this.servicios.obtenerUrlImagen(cancion.toLowerCase()));
  }

}
