import { Component } from '@angular/core';
import { Servicios } from '../../services/servicios/servicios';
import { FormsModule } from '@angular/forms';
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
  nombreInput: string = "";
  letraInput: string = "";
  guardarCancion(nombre: string, letra: string): void {
    const datos = [nombre, letra];

    this.servicios.guardarLetraCancion(datos).subscribe({
      next: (resultado) => {
        console.log("Se guardó correctamente");
      },
      error: (err) => console.error('Error al guardar:', err)
    });
  }

}
