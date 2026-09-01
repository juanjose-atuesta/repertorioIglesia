import { Component, effect } from '@angular/core';
import { Servicios } from '../../services/servicios/servicios';
import { signal } from '@angular/core'
import { CancionesConLetra } from '../../services/servicios/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarLetras } from '../agregar-letras/agregar-letras';
@Component({
  imports: [CommonModule, FormsModule, AgregarLetras],
  selector: 'app-letras',
  styleUrl: './letras.css',
  templateUrl: './letras.html',
})
export class Letras {
  constructor(private servicios: Servicios) {
    effect(() => {
      const cancion = this.servicios.cancionSeleccionada(); // lee el dato

      if (cancion) {
        console.log('Reacciono al instante:', cancion);
      }
      this.cancionActual.set(cancion);
      this.setLetraCancion(cancion);
    });
  }

  cancionesRepertorio = signal<CancionesConLetra[]>([]);
  cancionBuscarLetra: string = "";
  letraCancionBuscado = signal("");


  cancionActual = signal("");
  letraCancionActual = signal("");

  ngOnInit() {
    this.servicios.obtenerCurrentSong().subscribe({
      next: song => {

        this.cancionActual.set(song);
        this.setLetraCancion(song);
      }
    })
  }



  buscarLetraCancion(cancion: string) {
    this.servicios.buscarLetraCancion(cancion).subscribe({
      next: cancion => {
        console.log("se ejecuto el buscar letra");
        this.letraCancionBuscado.set(cancion.letra);


      }
    })
  }

  setLetraCancion(cancion: string) {
    this.servicios.buscarLetraCancion(cancion).subscribe({
      next: letra => {
        console.log("se ejecuto el buscar letra");
        this.letraCancionActual.set(letra.letra);


      }
    })
  }



}
