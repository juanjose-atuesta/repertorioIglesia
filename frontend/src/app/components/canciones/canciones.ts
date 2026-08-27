import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  }
  repositorioActual = signal<string[]>([]);
  urlCancion = signal("");
  cancionBuscar: string = "";
  ngOnInit() {
    this.obtenerRepertorioActual();
    console.log("ngONInit en canciones")
  }

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
  abrirEnNuevaPestana(url: string): void {
    window.open(url, '_blank');
  }


  buscarCancion(cancion: string) {
    this.servicios.buscarImagenes(cancion).subscribe({
      next: cancion => {
        this.urlCancion.set(this.servicios.obtenerUrlImagen(cancion[0]));
      }
    })
  }
}
