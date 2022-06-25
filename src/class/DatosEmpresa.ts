export class DatosEmpresa {
  private consecutivo_compra: number;
  private consecutivo_venta: number;
  private readonly cantidad_venta: number;
  private readonly cantidad_compra: number;

  constructor(
    consecutivo_compra: number,
    consecutivo_venta: number,
    cantidad_compra: number,
    cantidad_venta: number
  ) {
    this.consecutivo_compra = consecutivo_compra;
    this.consecutivo_venta = consecutivo_venta;
    this.cantidad_venta = cantidad_venta;
    this.cantidad_compra = cantidad_compra;
  }

  async consecutivosValidos() {
    if (
      this.consecutivo_compra >= this.cantidad_compra ||
      this.consecutivo_venta >= this.cantidad_venta
    ) {
      return false;
    }
    return true;
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
