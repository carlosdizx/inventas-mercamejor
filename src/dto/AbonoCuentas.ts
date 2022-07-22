export class AbonoCuentas {
  private readonly _fecha: Date;
  private readonly _valor: number;
  private _estado: boolean;

  constructor(fecha: Date, valor: number) {
    this._fecha = fecha;
    this._valor = valor;
    this._estado = true;
  }

  get fecha(): Date {
    return this._fecha;
  }

  get valor(): number {
    return this._valor;
  }

  get estado(): boolean {
    return this._estado;
  }

  set estado(value: boolean) {
    this._estado = value;
  }
}
