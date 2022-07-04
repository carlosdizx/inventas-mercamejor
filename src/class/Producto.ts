export class Producto {
  private _nombre: string;
  private _codigo_barras: number;
  private _marca: string;
  private _precio_unitario_compra: number;
  private _precio_unitario_venta: number;
  private _descuento: number;
  private _categoria: string;
  private _subCategoria: string;

  constructor(
    nombre: string,
    codigo_barras: number,
    marca: string,
    precio_unitario_compra: number,
    precio_unitario_venta: number,
    descuento: number,
    categoria: string,
    subCategoria: string
  ) {
    this._nombre = nombre;
    this._codigo_barras = codigo_barras;
    this._marca = marca;
    this._precio_unitario_compra = precio_unitario_compra;
    this._precio_unitario_venta = precio_unitario_venta;
    this._descuento = descuento;
    this._categoria = categoria;
    this._subCategoria = subCategoria;
  }

  get nombre(): string {
    return this._nombre;
  }

  get codigo_barras(): number {
    return this._codigo_barras;
  }

  get marca(): string {
    return this._marca;
  }

  get precio_unitario_compra(): number {
    return this._precio_unitario_compra;
  }

  get precio_unitario_venta(): number {
    return this._precio_unitario_venta;
  }

  get descuento(): number {
    return this._descuento;
  }

  get categoria(): string {
    return this._categoria;
  }

  get subCategoria(): string {
    return this._subCategoria;
  }
}
