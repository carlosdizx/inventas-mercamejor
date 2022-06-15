export class DatosEmpresa {
  private _consecutivo_compra: number;
  private _consecutivo_venta: number;

  constructor(consecutivo_compra: number, consecutivo_venta: number) {
    this._consecutivo_compra = consecutivo_compra;
    this._consecutivo_venta = consecutivo_venta;
  }

  get consecutivo_compra(): number {
    return this._consecutivo_compra;
  }

  get consecutivo_venta(): number {
    return this._consecutivo_venta;
  }

  async modificarConsecutivoCompra(): Promise<void> {
    this._consecutivo_compra = this._consecutivo_compra + 1;
  }

  async modificarConsecutivoVenta(): Promise<void> {
    this._consecutivo_venta = this._consecutivo_venta + 1;
  }
}
