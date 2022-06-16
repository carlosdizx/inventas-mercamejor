export class DatosEmpresa {
  private consecutivo_compra: number;
  private consecutivo_venta: number;

  constructor(consecutivo_compra: number, consecutivo_venta: number) {
    this.consecutivo_compra = consecutivo_compra;
    this.consecutivo_venta = consecutivo_venta;
  }

  darConsecutivoCompra(): number {
    return this.consecutivo_compra;
  }

  darConsecutivoVenta(): number {
    return this.consecutivo_venta;
  }

  async modificarConsecutivoCompra(): Promise<void> {
    this.consecutivo_compra = this.consecutivo_compra + 1;
  }

  async modificarConsecutivoVenta(): Promise<void> {
    this.consecutivo_venta = this.consecutivo_venta + 1;
  }
}
