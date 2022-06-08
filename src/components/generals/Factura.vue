<template>
  <v-card class="factura">
    <v-card-title>
      <h2 class="mx-auto text-center">{{ tipo_factura }}</h2>
    </v-card-title>
    <v-card-text>
      <h2>{{ documento }}</h2>
      <h2>No factura: {{ consecutivo }} de 100000</h2>
      <h3>Caja: {{ caja }}</h3>
      {{ nombre }}
      <div class="colum__4">
        <h4 class="colum__4-h4">Producto</h4>
        <h4 class="colum__4-h4">Precio</h4>
        <h4 class="colum__4-h4">Descuento</h4>
        <h4 class="colum__4-h4">Subtotal</h4>
      </div>

      <!--  seccion productos  -->

      <div
        v-for="(producto, index) in productos"
        :key="index"
        class="productos"
      >
        <h5 class="productos__h5">
          {{ producto.cantidad }}*{{ producto.nombre }}
        </h5>
        <h5 class="productos__h5">{{ producto.precio }}</h5>
        <h5 class="productos__h5">{{ producto.descuento }}</h5>
        <h5 class="productos__h5">{{ producto.subtotal }}</h5>
        <v-divider />
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
      <b class="total__N">${{ descuento }}</b>
    </div>
    <v-divider />
    <h2>Gracias por su compra</h2>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Factura",
  data: () => ({
    consecutivo: 0,
    subtotal: 0,
    descuento: 0,
    total: 0,
  }),
  props: {
    tipo_factura: String,
    documento: Number,
    nombre: String,
    telefono: Number,
    caja: String,
    productos: Array,
  },
  methods: {
    inicializador() {
      this.subtotal = 0;
      this.descuento = 0;
      this.total = 0;
    },
  },
  created() {
    this.inicializador();
  },
});
</script>

<style scoped>
.factura {
  margin: 0px;
  width: 500px;
  height: 750px;
  overflow: auto;
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
