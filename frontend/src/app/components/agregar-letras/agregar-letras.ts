import { Component } from '@angular/core';
import { Servicios } from '../../services/servicios/servicios';
import { FormsModule } from '@angular/forms';
import { signal } from "@angular/core";
@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-agregar-letras',
  styleUrl: './agregar-letras.css',
  templateUrl: './agregar-letras.html',
})
export class AgregarLetras {
  constructor(private servicios: Servicios) {

  }
  nombreInput = signal("");
  letraInput = signal("");
  guardarCancion(nombre: string, letra: string): void {
    const datos = [nombre, letra];

    this.servicios.guardarLetraCancion(datos).subscribe({
      next: (resultado) => {
        console.log("Se guardó correctamente");
        this.nombreInput.set("");
        this.letraInput.set("");
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }

}
