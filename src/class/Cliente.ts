export class Cliente {
  private tipo_documento: string;
  private documento: string;
  private nombres: string;
  private apellidos: string;
  private fecha_nacimiento: Date;
  private genero: string;
  private celular: string;
  private correo: string;
  private direccion: string;

  constructor(
    tipo_documento: string,
    documento: string,
    nombres: string,
    apellidos: string,
    fecha_nacimiento: Date,
    genero: string,
    celular: string,
    correo: string,
    direccion: string
  ) {
    this.tipo_documento = tipo_documento;
    this.documento = documento;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.fecha_nacimiento = fecha_nacimiento;
    this.genero = genero;
    this.celular = celular;
    this.correo = correo;
    this.direccion = direccion;
  }
}
