import { Component } from '@angular/core';
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

  }

  cancionesRepertorio = signal<CancionesConLetra[]>([]);
  cancionBuscarLetra: string = "";
  letraCancionBuscado = signal("");
  ngOnInit() {
    this.obtenerLetrasRepertorio();
  }

  obtenerLetrasRepertorio() {
    this.servicios.obtenerCancionesRepertorio().subscribe({
      next: canciones => {
        this.cancionesRepertorio.set(canciones);
        console.log(canciones);
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


}
