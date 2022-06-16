<template>
  <div>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="6">
            <v-slider
              label="Descuento adicional"
              max="100"
              min="0"
              v-model="descuento_adicional"
              thumb-label="always"
            />
            <vuetify-money
              label="Descuento"
              prepend-icon="mdi-percent"
              type="number"
              prefix="%"
              dense
              outlined
              counter
              v-model="descuento_adicional"
              @input="evaluarValorDescuento"
            />
            <v-text-field
              label="Precio final"
              prepend-icon="mdi-cash"
              type="number"
              prefix="$"
              color="success"
              dense
              readonly
              outlined
              :value="total - (total * descuento_adicional) / 100"
            />
            <v-col cols="6">
              <vuetify-money
                label="Calculadora rápida"
                prepend-icon=""
                prefix="$"
                dense
                counter
                v-model="calculadora"
              />
            </v-col>
          </v-col>
          <v-col cols="6">
            <v-chip color="amber" class="ma-2">
              Subtotal: {{ subtotal }}
            </v-chip>
            <v-chip color="info" class="ma-2">
              Descuento: {{ descuento }}
            </v-chip>
            <v-chip color="success" class="ma-2"> Total: {{ total }} </v-chip>
            <v-chip color="success" class="ma-2">
              Descuento adicional: {{ (total * descuento_adicional) / 100 }}
            </v-chip>
            <v-alert
              outlined
              dark
              color="success darken-2"
              class="mx-auto text-center"
            >
              Precio final: $ {{ total - (total * descuento_adicional) / 100 }}
            </v-alert>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-data-table :headers="columnas" :items="filas">
      <template v-slot:item.cantidad="{ item }">
        <v-edit-dialog :return-value="item.cantidad" @save="calcularValores">
          {{ item.cantidad }}
          <template v-slot:input>
            <v-text-field label="Editar" counter v-model="item.cantidad" />
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "ListadoItems",
  data: () => ({
    total: 0,
    subtotal: 0,
    descuento: 0,
    calculadora: 0,
    columnas: [
      { text: "Codigo", value: "codigo_barras" },
      { text: "Producto", value: "nombre" },
      { text: "Cantidad", value: "cantidad" },
      { text: "Precio", value: "precio_unitario_venta" },
      { text: "Descuento", value: "descuento" },
      { text: "Subtotal", value: "subtotal" },
    ],
    filas: [{}],
    descuento_adicional: 0,
  }),
  methods: {
    async agregarProducto(producto: any) {
      let agregado = false;
      for (const fila of this.filas) {
        const temp: any = fila;
        if (temp.id === producto.id) {
          temp.cantidad = temp.cantidad + 1;
          temp.subtotal = temp.cantidad * producto.precio_unitario_venta;
          agregado = true;
        }
      }
      if (!agregado) {
        producto.cantidad = 1;
        producto.subtotal = producto.precio_unitario_venta;
        this.filas.push(producto);
        agregado = true;
      }
      if (agregado) {
        this.calcularValores();
        await Swal.fire({
          title: "Agregado con exito!",
          icon: "success",
          showConfirmButton: false,
          timer: 500,
        });
      }
    },
    calcularValores() {
      this.subtotal = 0;
      this.descuento = 0;
      this.total = 0;
      this.calculadora = this.calculadora * 1;
      this.filas.forEach((item: any) => {
        this.subtotal += item.subtotal;
        this.descuento += item.descuento * item.cantidad;
        this.total = this.subtotal - this.descuento;
      });
    },
    darItemsFactura() {
      const datos_factura = {
        productos: this.filas,
        subtotal: this.subtotal,
        descuento: this.descuento,
        total: this.total,
      };
      return datos_factura;
    },
    evaluarValorDescuento() {
      if (this.descuento_adicional > 100) {
        this.descuento_adicional = 0;
        Swal.fire({
          title: "Valor errado",
          icon: "error",
          showConfirmButton: false,
          timer: 800,
        });
      }
    },
  },
  created() {
    this.filas = [];
  },
});
</script>

<style scoped></style>
