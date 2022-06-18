<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-btn color="red darken-2" @click="cambiarEstado">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card class="factura">
      <v-card-title>
        <h2 class="mx-auto text-center">Factura de {{ tipo }}</h2>
      </v-card-title>
      <v-card-text>
        <h2>Documento del cliente: {{ documento_cliente }}</h2>
        <h2>No factura: {{ consecutivo }} de 100000</h2>
        <h3>Caja: {{ caja }}</h3>
        <h3>Fecha de pago: {{ fecha_pago ? fecha_pago : "No aplica" }}</h3>
        <div class="colum__2">
          <p class="izquierda">{{ nombre_cliente }}</p>
          <p class="derecha">{{ tipo_factura }}</p>
        </div>
        <div class="colum__4">
          <h4 class="colum__4-h4">Producto</h4>
          <h4 class="colum__4-h4">Precio unitario</h4>
          <h4 class="colum__4-h4">Descuento</h4>
          <h4 class="colum__4-h4">Subtotal</h4>
        </div>

        <!--  seccion productos  -->
        <div class="scroll">
          <div
            v-for="(producto, index) in productos"
            :key="index"
            class="productos"
          >
            <h5 class="productos__h5">
              {{ producto.cantidad }}*{{ producto.nombre }}
            </h5>
            <h5 class="productos__h5">{{ producto.precio }}</h5>
            <h5 class="productos__h5">
              {{ producto.cantidad }}*{{ producto.descuento }}
            </h5>
            <h5 class="productos__h5">{{ producto.subtotal }}</h5>
            <v-divider />
          </div>
        </div>
      </v-card-text>

      <!--  Calculos  -->
      <div class="sub">
        <b class="subtotal">Subtotal:</b>
        <b class="subtotal__N">${{ subtotal }}</b>
      </div>
      <div class="des">
        <b class="descuento">Descuento:</b>
        <b class="descuento__N">${{ descuento }}</b>
      </div>
      <div class="tot">
        <b class="total">Total:</b>
        <b class="total__N">${{ total }}</b>
      </div>
      <v-divider />
      <h2>Gracias por su compra</h2>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Factura",
  data: () => ({
    dialog: false,
    tipo: "Venta",
    tipo_factura: "Factura de venta",
    fecha_pago: null,
    documento: null,
    nombre_cliente: "",
    documento_cliente: "",
    caja: "@@@@@@_1",
    productos: [{}],
    consecutivo: 0,
    subtotal: 0,
    descuento: 0,
    total: 0,
  }),
  methods: {
    cambiarEstado() {
      this.dialog = !this.dialog;
    },
    async asignarValores(
      datos_cliente: any,
      datos_movimiento: any,
      consecutivo: number
    ) {
      const productos: any[] = [];
      for (const producto of datos_movimiento.productos) {
        productos.push({
          nombre: producto.nombre,
          cantidad: producto.cantidad,
          precio: producto.precio_unitario_venta,
          descuento: producto.descuento,
          subtotal: producto.subtotal,
        });
      }
      this.documento_cliente = datos_cliente.documento_cliente;
      this.nombre_cliente = datos_cliente.nombre_cliente;
      this.tipo = datos_cliente.tipo;
      this.fecha_pago = datos_cliente.fecha_pago;
      this.tipo_factura = datos_cliente.tipo_factura;
      this.consecutivo = consecutivo;
      this.productos = productos;
      this.caja = "@@@@@@_" + (Math.floor(Math.random() * (3 - 1)) + 1);
      this.calcularVenta(datos_movimiento, productos);
    },
    calcularVenta(datos: any, productos: any[]) {
      let subtotal = 0;
      let descuento = 0;
      let total = 0;
      productos.forEach((producto) => {
        subtotal += producto.cantidad * producto.precio;
        descuento += producto.cantidad * producto.descuento;
        total = subtotal - descuento;
      });
      this.subtotal = subtotal;
      this.descuento = descuento;
      this.total = subtotal - descuento;
    },
  },
});
</script>

<style scoped>
.factura {
  margin: 0px;
}

h1 {
  padding-top: 30px;
  text-align: center;
  margin: 10px;
}

h2 {
  margin: 2px;
  text-align: center;
  font-weight: 100;
}

h3 {
  margin: 0px;
  text-align: center;
  font-weight: 100;
}

.colum__2 {
  padding-top: 10px;
}

.izquierda {
  display: inline-block;
  width: 49%;
  text-align: center;
  margin: 0;
}

.derecha {
  display: inline-block;
  text-align: center;
  width: 49%;
  margin: 0;
}

.colum__4-h4 {
  display: inline-block;
  width: 23%;
  text-align: center;
}
.scroll {
  height: 258px;
  overflow: auto;
}
.productos__h5 {
  margin: 0;
  padding-bottom: 5px;
  font-weight: 100;
  font-size: 14px;
  display: inline-block;
  width: 23%;
  text-align: center;
}

.subtotal {
  display: inline-block;
  width: 65%;
  text-align: right;
  padding-top: 10px;
}

.subtotal__N {
  display: inline-block;
  width: 34%;
  text-align: center;
  padding-top: 10px;
}

.descuento {
  display: inline-block;
  width: 65%;
  text-align: right;
  padding-top: 10px;
}

.descuento__N {
  display: inline-block;
  width: 34%;
  text-align: center;
  padding-top: 10px;
}

.total {
  display: inline-block;
  width: 65%;
  text-align: right;
  padding-top: 10px;
}

.total__N {
  display: inline-block;
  width: 34%;
  text-align: center;
  padding-top: 10px;
}
</style>
