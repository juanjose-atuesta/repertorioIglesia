import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Servicios } from '../../services/servicios/servicios';
import { signal } from '@angular/core';
@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-repertorio',
  styleUrl: './repertorio.css',
  templateUrl: './repertorio.html',
})
export class Repertorio {

  constructor(
    public servicios: Servicios

  ) { }
  contador: number = 1;
  canciones: string[] = [];
  repertorioActual = signal<string[]>([]);
  STORAGE_KEY = 'cancionesTerminadas';
  cancionesTerminadas: string[] = [];

  terminarCancion(cancion: string): void {
    if (!this.cancionesTerminadas.includes(cancion)) {
      this.cancionesTerminadas.push(cancion);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cancionesTerminadas)); // agregar esto
    }
  }
  onSubmit() {
    console.log("hola");
  }
  get rango(): number[] {
    return Array(this.contador).fill(0).map((_, i) => i);
  }
  agregarCancion(cancion: string) {
    this.contador += 1;
    this.canciones.push(cancion);
    console.log(this.canciones);
  }
  eliminarCancion(cancion: string) {
    if (cancion) {

      let indice: any = this.canciones.indexOf(cancion);
      this.canciones.splice(indice, 1);
      this.contador -= 1;
      console.log(this.canciones);
    }
    else {
      this.contador -= 1;
    }
  }
  agregarRepertorio() {
    console.log("estas canciones se agregaron al repertorio");
    console.log(this.canciones);

    this.servicios.guardarRepertorio(this.canciones.map(cancion => cancion.toLowerCase())).subscribe({
      next: (res) => {
        console.log('Guardado:', res);
        this.obtenerRepertorioActual(); // llama esto DESPUÉS de que el guardado terminó
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }
  obtenerRepertorioActual(): void {
    this.servicios.obtenerRepertorio().subscribe({
      next: (canciones) => {
        this.repertorioActual.set(canciones); // aquí sí ya tienes el dato real
        console.log("repertorio cargado al iniciar", canciones, this.repertorioActual);
      },
      error: (err) => console.error('Error:', err)
    });
  }

  ngOnInit() {
    this.obtenerRepertorioActual();
    this.cargarCancionesTerminadas(); // agregar esto
    console.log("ngOnInit")
  }

  seleccionarCancion(nombre: string) {
    console.log("seleccionaste una cancion", nombre);
    this.servicios.guardarCurrentSong(nombre).subscribe({
      next: resultado => {

        this.servicios.actualizarCancionSeleccionada(nombre);
      }
    })
  }

  cargarCancionesTerminadas(): void {
    const guardado = localStorage.getItem(this.STORAGE_KEY);
    if (guardado) {
      this.cancionesTerminadas = JSON.parse(guardado);
    }
  }


  limpiarRepertorio(): void {
    this.servicios.guardarRepertorio([]).subscribe({
      next: (res) => {
        console.log('Repertorio limpiado:', res);
        this.repertorioActual.set([]);
        this.cancionesTerminadas = [];
        localStorage.removeItem(this.STORAGE_KEY); // limpia el localStorage también
      },
      error: (err) => console.error('Error al limpiar:', err)
    });
  }
}
