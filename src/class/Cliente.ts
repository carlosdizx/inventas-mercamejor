export class Cliente {
  private readonly _tipo_documento: string;
  private readonly _documento: string;
  private readonly _nombres: string;
  private readonly _apellidos: string;
  private readonly _fecha_nacimiento: Date;
  private readonly _genero: string;
  private readonly _celular: string;
  private readonly _correo: string;
  private readonly _direccion: string;

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
    this._tipo_documento = tipo_documento;
    this._documento = documento;
    this._nombres = nombres;
    this._apellidos = apellidos;
    this._fecha_nacimiento = fecha_nacimiento;
    this._genero = genero;
    this._celular = celular;
    this._correo = correo;
    this._direccion = direccion;
  }

  get tipo_documento(): string {
    return this._tipo_documento;
  }

  get documento(): string {
    return this._documento;
  }

  get nombres(): string {
    return this._nombres;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  get fecha_nacimiento(): Date {
    return this._fecha_nacimiento;
  }

  get genero(): string {
    return this._genero;
  }

  get celular(): string {
    return this._celular;
  }

  get correo(): string {
    return this._correo;
  }

  get direccion(): string {
    return this._direccion;
  }
}
