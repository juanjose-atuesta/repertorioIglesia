import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Servicios } from '../../services/servicios/servicios';

interface CancionConImagen {
  nombre: string;
  archivo: string | null;
  url: string | null;
}

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-canciones',
  styleUrl: './canciones.css',
  templateUrl: './canciones.html',
})
export class Canciones implements OnInit {
  canciones: CancionConImagen[] = [];
  busqueda: string = '';
  resultadosBusqueda: CancionConImagen[] = [];
  busco: boolean = false;

  constructor(private servicios: Servicios) {}

  ngOnInit() {
    this.obtenerRepertorio();
  }

  obtenerRepertorio() {
    this.servicios.obtenerRepertorio().subscribe({
      next: (nombres) => {
        if (nombres.length === 0) {
          this.canciones = [];
          return;
        }
        const busquedas = nombres.map((nombre) =>
          this.servicios.buscarImagenes(nombre)
        );
        forkJoin(busquedas).subscribe({
          next: (resultados) => {
            this.canciones = nombres.map((nombre, i) => {
              const archivos = resultados[i];
              const archivo = archivos.length > 0 ? archivos[0] : null;
              return {
                nombre,
                archivo,
                url: archivo ? this.servicios.obtenerUrlImagen(archivo) : null,
              };
            });
          },
          error: (err) => console.error('Error buscando imagenes:', err),
        });
      },
      error: (err) => console.error('Error:', err),
    });
  }

  buscarImagen() {
    const q = this.busqueda.trim();
    if (!q) return;
    this.busco = true;
    this.servicios.buscarImagenes(q).subscribe({
      next: (archivos) => {
        this.resultadosBusqueda = archivos.map((archivo) => ({
          nombre: archivo.replace(/\.[^.]+$/, ''),
          archivo,
          url: this.servicios.obtenerUrlImagen(archivo),
        }));
      },
      error: (err) => console.error('Error en busqueda:', err),
    });
  }

  abrirEnNuevaPestana(url: string | null) {
    if (url) window.open(url, '_blank');
  }
}
