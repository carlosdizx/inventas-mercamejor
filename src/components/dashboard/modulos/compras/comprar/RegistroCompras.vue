<template>
  <v-card>
    <v-card-title class="mr-5 ml-5">Registrar compra</v-card-title>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="crearCuenta">
        <v-card-text>
          <v-row class="mr-5 ml-5">
            <v-col cols="5">
              <v-text-field
                label="NIT/Cédula"
                v-model="cabFactura.nit"
                @input="buscarProveedor()"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="mt-2">
              <BuscarElemento
                @getItem="seleccionarProveedor"
                icon="mdi-lead-pencil"
                :items="proveedores"
                :headers="columnas"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Nombre del proveedor"
                v-model="cabFactura.nombreProveedor"
                readonly
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col cols="6">
              <validation-provider
                v-slot="{ errors }"
                name="Fecha de Compra"
                rules="required"
              >
                <v-text-field
                  label="Fecha de Compra"
                  v-model="cabFactura.fechaDocumento"
                  :error-messages="errors"
                  type="date"
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                name="Tipo de Compra"
                rules="required"
              >
                <v-select
                  label="Tipo de Compra"
                  v-model="cabFactura.tipoCompra"
                  :error-messages="errors"
                  :items="tiposDocumento"
                  outlined
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                name="Número de Documento"
                rules="required"
              >
                <v-text-field
                  type="number"
                  label="Número de Documento"
                  v-model="cabFactura.nDocumento"
                  :error-messages="errors"
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                name="Tipo de Pago"
                rules="required"
              >
                <v-select
                  label="Tipo de Pago"
                  v-model="cabFactura.tipoPago"
                  :error-messages="errors"
                  :items="tiposPagos"
                  outlined
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Fecha de pago"
                rules="required"
              >
                <v-text-field
                  label="Fecha de pago"
                  type="date"
                  v-model="cabFactura.fechaPago"
                  :error-messages="errors"
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Fecha de llegada del producto"
                rules="required"
              >
                <v-text-field
                  label="Fecha de llegada del producto"
                  type="date"
                  v-model="cabFactura.fechaLlegadaProducto"
                  :error-messages="errors"
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <TablaCompras @enviarProductos="actualizarProductos" />

          <v-row class="mr-5 ml-5">
            <v-col>
              <v-text-field
                label="Subtotal"
                readonly
                v-model="cabFactura.subtotal"
                outlined
              ></v-text-field>
            </v-col>

            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Descuento"
                rules="required"
              >
                <v-text-field
                  @input="calcularTotal()"
                  label="Descuento"
                  v-model="cabFactura.descuento"
                  :error-messages="errors"
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>

            <v-col>
              <validation-provider
                v-slot="{ errors }"
                name="Impuesto"
                rules="required"
              >
                <v-text-field
                  label="Impuesto"
                  @input="calcularTotal()"
                  v-model="cabFactura.impuesto"
                  :error-messages="errors"
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col class="text-center">
              <h2 class="text-gray">Total: ${{ cabFactura.total }}</h2>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col>
              <v-btn
                @click="registrarCompra()"
                x-large
                dark
                class="color_a mb-3"
                block
                >Registrar</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
      <v-col v-if="!invalid">.</v-col>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

import { COLUMNAS } from "@/models/Proveedor";

import { LISTAR_PROVEDOORES } from "@/generals/Funciones";
import { GUARDAR } from "@/services/crud";

import TablaCompras from "@/components/dashboard/modulos/compras/comprar/TablaCompras.vue";
import BuscarElemento from "@/components/crud/BuscarElemento.vue";

export default Vue.extend({
  name: "RegistroCompras",
  components: {
    TablaCompras,
    BuscarElemento,
  },
  data: () => ({
    columnas: COLUMNAS,
    cabFactura: {
      nit: "",
      nombreProveedor: "Proveedores varios",
      fechaDocumento: "",
      nDocumento: "",
      tipoCompra: "Compra",
      tipoPago: "Contado",
      fechaPago: "",
      fechaLlegadaProducto: "",
      compras: [],
      subtotal: 0,
      descuento: 0,
      impuesto: 0,
      total: 0,
      created_at: new Date(),
      updated_at: new Date(),
    },
    tiposDocumento: ["Compra", "Pedido"],
    tiposPagos: ["Contado", "Credito"],
    proveedores: [""],
  }),
  computed: {
    numeroDocumento() {
      return `${this.cabFactura.tipoCompra[0]}-${this.cabFactura.nDocumento}`;
    },
    validarRegistro() {
      let val = false;
      if (
        this.cabFactura.total < 1 ||
        this.cabFactura.descuento < this.cabFactura.total ||
        this.cabFactura.compras.length === 0
      ) {
        val = true;
      }
      return val;
    },
  },
  methods: {
    async listarProveedores() {
      this.proveedores = [];
      const res: any = await LISTAR_PROVEDOORES();
      res.forEach((prov: any) => this.proveedores.push(prov.data()));
    },
    buscarProveedor() {
      let result = "Proveedores varios";
      this.proveedores.forEach((prov: any) => {
        if (this.cabFactura.nit === prov.documento) {
          result = `${prov.nombres} ${prov.apellidos}`;
        }
      });
      this.cabFactura.nombreProveedor = result;
    },
    resetCampos() {
      this.cabFactura.nombreProveedor = "Proveedores varios";
      this.cabFactura.nit = "";
      this.cabFactura.fechaDocumento = "";
      this.cabFactura.nDocumento = "";
      this.cabFactura.tipoCompra = "Compra";
      this.cabFactura.tipoPago = "Contado";
      this.cabFactura.fechaPago = "";
      this.cabFactura.fechaLlegadaProducto = "";
      this.cabFactura.compras = [];
      this.cabFactura.subtotal = 0;
      this.cabFactura.descuento = 0;
      this.cabFactura.impuesto = 0;
      this.cabFactura.total = 0;
    },
    actualizarProductos(productos: any) {
      this.cabFactura.compras = productos;
      this.calcularSubtotal();
      this.calcularTotal();
    },
    calcularSubtotal() {
      let subtototal = 0;
      this.cabFactura.compras.forEach((com: any) => {
        subtototal += com.subTotal;
      });
      this.cabFactura.subtotal = subtototal;
    },
    calcularTotal() {
      this.cabFactura.total =
        Number(this.cabFactura.subtotal) -
        Number(this.cabFactura.descuento) +
        Number(this.cabFactura.impuesto);
    },
    async registrarCompra() {
      this.cabFactura.created_at = new Date();
      this.cabFactura.updated_at = new Date();
      await GUARDAR("compras", this.cabFactura);
      this.resetCampos();
    },
    seleccionarProveedor(prov: any) {
      this.cabFactura.nit = prov.documento;
      this.cabFactura.nombreProveedor = `${prov.nombres} ${prov.apellidos}`;
    },
  },
  created() {
    this.listarProveedores();
    this.columnas = this.columnas.filter((col: any) => {
      if (col.value !== "detalle") return true;
      return false;
    });
  },
});
</script>

<style scoped>
.v-row {
  margin: 0px 0px 0px;
}
</style>
