<template>
  <v-dialog persistent v-model="mostrar">
    <v-card class="pt-3">
      <div class="text-center">
        <h1>Editar item de compra</h1>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <v-simple-table class="ml-3 mt-3">
            <thead>
              <tr>
                <th class="text-left">Código</th>
                <th class="text-left">Descripción Producto</th>
                <th class="text-left">Bodega</th>
                <th class="text-left">Cantidad</th>
                <th class="text-left">Precio Compra</th>
                <th class="text-left">% Ganancia</th>
                <th class="text-left">Precio Venta</th>
                <th class="text-left">Impuesto</th>
                <th class="text-left">Descuento</th>
                <th class="text-left">Subototal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <h2>
                    {{ compra.codigo_barras }}
                  </h2>
                </th>
                <th>
                  <h2>
                    {{ compra.descripcion_producto }}
                  </h2>
                </th>
                <th>
                  <v-select
                    v-model="compra.bodega"
                    :items="bodegasDisponibles"
                    item-text="nombre"
                    item-value="nombre"
                  ></v-select>
                </th>
                <th>
                  <v-text-field
                    @input="calcularSubtotal()"
                    v-model.number="compra.cantidad"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="calcularGananciaPrecioCompra()"
                    v-model.number="compra.precio_compra"
                  ></v-text-field>
                </th>

                <th>
                  <v-text-field
                    @input="ingresarGanancia()"
                    v-model.number="porGanancia"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="ingresarVenta()"
                    v-model.number="compra.precio_venta"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="calcularSubtotal()"
                    v-model.number="compra.impuesto"
                  ></v-text-field>
                </th>
                <th>
                  <v-text-field
                    @input="calcularSubtotal()"
                    v-model.number="compra.descuento"
                  ></v-text-field>
                </th>
                <th>
                  <h2>
                    {{ compra.subtotal }}
                  </h2>
                </th>
              </tr>
            </tbody>
          </v-simple-table>
          <v-btn class="danger" @click="cancelar()">Cancelar</v-btn>
          <v-btn
            class="success"
            :disabled="!validarDatos"
            @click="actualizarItem()"
            >Actualizar</v-btn
          >
          <v-col v-if="!invalid">.</v-col>
        </ValidationObserver>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { ProductoCompra } from "@/interfaces/ProductoCompra";
import { REDONDEAR } from "@/generals/procesamientos";

export default Vue.extend({
  name: "EditarCompra",
  props: {
    mostrar: Boolean,
    indexElement: Number,
    compraAnterior: {
      type: Object as PropType<ProductoCompra>,
    },
    bodegasDisponibles: Array,
  },
  data: () => ({
    compra: {} as ProductoCompra,
    porGanancia: 0,
  }),
  computed: {
    validarDatos() {
      if (
        !this.compra.codigo_barras ||
        !this.compra.descripcion_producto ||
        !this.compra.descripcion_producto ||
        !this.compra.bodega ||
        this.compra.cantidad < 1 ||
        this.compra.precio_compra < 1 ||
        this.compra.precio_venta < 1 ||
        this.porGanancia < 0 ||
        this.compra.subtotal < 0 ||
        this.compra.precio_venta < this.compra.precio_compra
      )
        return false;
      return true;
    },
  },
  methods: {
    actualizarItem() {
      this.$emit("actualizar", {
        compra: this.compra,
        indice: this.indexElement,
      });
    },
    cancelar() {
      this.$emit("cancelar");
    },
    calcularGananciaPrecioCompra() {
      if (this.porGanancia > 0 && this.compra.precio_compra > 0) {
        let precio_venta: number =
          this.compra.precio_compra * (1 + this.porGanancia / 100);
        let precio = REDONDEAR(precio_venta, -2);
        this.compra.precio_venta = precio;
      }
      this.calcularSubtotal();
    },
    calcularSubtotal() {
      const subtotal: number =
        this.compra.cantidad * this.compra.precio_compra -
        this.compra.descuento +
        this.compra.impuesto;
      this.compra.subtotal = subtotal;
    },
    ingresarGanancia() {
      if (this.porGanancia >= 0 && this.compra.precio_compra) {
        let precio_venta: number =
          this.compra.precio_compra * (1 + this.porGanancia / 100);
        let precio = REDONDEAR(precio_venta, -2);
        this.compra.precio_venta = precio;
      }
    },
    ingresarVenta() {
      if (
        Number(this.compra.precio_venta) >= Number(this.compra.precio_compra)
      ) {
        const porGanancia: number =
          ((Number(this.compra.precio_venta) -
            Number(this.compra.precio_compra)) /
            Number(this.compra.precio_compra)) *
          100;
        this.porGanancia = Math.trunc(porGanancia);
      } else {
        this.porGanancia = 0;
      }
    },
  },
  created() {
    this.compra = { ...this.compraAnterior };
    this.porGanancia = Math.trunc(
      ((this.compra.precio_venta - this.compra.precio_compra) /
        this.compra.precio_compra) *
        100
    );
    this.calcularGananciaPrecioCompra();
  },
});
</script>
