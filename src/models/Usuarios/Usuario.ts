export class Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  celular: string;
  direccion: string;
  genero: string;
  fecha_nacimiento: Date;

  constructor() {
    this.id = 0;
    this.nombres = "";
    this.apellidos = "";
    this.correo = "";
    this.celular = "";
    this.direccion = "";
    this.genero = "";
    this.fecha_nacimiento = new Date();
  }
}
