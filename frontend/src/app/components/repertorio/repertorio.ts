import { CommonModule } from '@angular/common';
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
    private servicios: Servicios

  ) { }
  contador: number = 1;
  canciones: string[] = [];
  repertorioActual = signal<string[]>([]);

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

    this.servicios.guardarRepertorio(this.canciones).subscribe({
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
    console.log("ngOnInit")
  }




}
