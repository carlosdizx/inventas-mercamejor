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
                v-model="cabFactura.documento_proveedor"
                @input="buscarProveedor()"
                outlined
                dense
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
                v-model="cabFactura.nombre_proveedor"
                readonly
                dense
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
                  v-model="cabFactura.fecha_documento"
                  :error-messages="errors"
                  type="date"
                  outlined
                  dense
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
                  v-model="cabFactura.tipo_compra"
                  :error-messages="errors"
                  :items="tiposDocumento"
                  outlined
                  dense
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="3">
              <validation-provider
                v-slot="{ errors }"
                name="Número de Factura"
                rules="required"
              >
                <v-text-field
                  type="number"
                  label="Número de Factura"
                  v-model="cabFactura.cod_factura"
                  :error-messages="errors"
                  outlined
                  dense
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
                  v-model="cabFactura.tipo_pago"
                  :error-messages="errors"
                  :items="tiposPagos"
                  outlined
                  dense
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
                  v-model="cabFactura.fecha_pago"
                  :error-messages="errors"
                  outlined
                  dense
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
                  v-model="cabFactura.fecha_llegada_producto"
                  :error-messages="errors"
                  outlined
                  dense
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <TablaCompras
            :compras="cabFactura.compras"
            @enviarProductos="actualizarProductos"
          />

          <v-row class="mr-5 ml-5">
            <v-col>
              <v-text-field
                label="Subtotal"
                readonly
                v-model="cabFactura.subtotal"
                outlined
                dense
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
                  dense
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
                  dense
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col class="text-center">
              <h2 class="text-gray">Total: ${{ cabFactura.total }}</h2>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5" v-if="!compraAnterior">
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
          <v-row class="mr-5 ml-5" v-if="compraAnterior">
            <v-col>
              <v-btn
                @click="registrarCompra()"
                x-large
                dark
                class="color_a mb-3"
                block
                >Actualizar Compra</v-btn
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
import { Compra } from "@/interfaces/Compra";

export default Vue.extend({
  name: "RegistroCompras",
  components: {
    TablaCompras,
    BuscarElemento,
  },
  props: {
    compraAnterior: {
      type: Object as () => Compra,
    },
  },
  data() {
    return {
      columnas: COLUMNAS,
      cabFactura: {
        documento_proveedor: 0,
        nombre_proveedor: "Proveedores varios",
        fecha_documento: "",
        cod_factura: "",
        tipo_compra: "Compra",
        tipo_pago: "Contado",
        fecha_pago: "",
        fecha_llegada_producto: "",
        compras: [] as Compra[],
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
    };
  },
  computed: {
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
        console.log(prov);
        if (Number(this.cabFactura.documento_proveedor) === prov.documento) {
          console.log(prov.nombres);
          result = `${prov.nombres} ${prov.apellidos}`;
        }
      });
      this.cabFactura.nombre_proveedor = result;
    },
    resetCampos() {
      this.cabFactura.nombre_proveedor = "Proveedores varios";
      this.cabFactura.documento_proveedor = 0;
      this.cabFactura.fecha_documento = "";
      this.cabFactura.cod_factura = "";
      this.cabFactura.tipo_compra = "Compra";
      this.cabFactura.tipo_pago = "Contado";
      this.cabFactura.fecha_pago = "";
      this.cabFactura.fecha_llegada_producto = "";
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
        subtototal += Number(com.subtotal);
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
      this.cabFactura.documento_proveedor = Number(
        this.cabFactura.documento_proveedor
      );
      await GUARDAR("compras", this.cabFactura);
      this.resetCampos();
    },
    seleccionarProveedor(prov: any) {
      this.cabFactura.documento_proveedor = prov.documento;
      this.cabFactura.nombre_proveedor = `${prov.nombres} ${prov.apellidos}`;
    },
  },
  created() {
    this.listarProveedores();
    this.columnas = this.columnas.filter((col: any) => {
      if (col.value !== "detalle") return true;
      return false;
    });
    if (this.compraAnterior) {
      console.log(this.compraAnterior);
      this.cabFactura.nombre_proveedor = this.compraAnterior.nombre_proveedor;
      this.cabFactura.documento_proveedor =
        this.compraAnterior.documento_proveedor;
      //this.cabFactura.fecha_documento = this.compraAnterior.fecha_documento;
      this.cabFactura.cod_factura = this.compraAnterior.cod_factura;
      this.cabFactura.tipo_compra = this.compraAnterior.tipo_compra;
      this.cabFactura.tipo_pago = this.compraAnterior.tipo_pago;
      //this.cabFactura.fecha_pago = this.compraAnterior.fecha_pago;
      //this.cabFactura.fecha_llegada_producto = this.compraAnterior;
      //this.cabFactura.compras = this.compraAnterior.compras;
      this.cabFactura.subtotal = this.compraAnterior.subtotal;
      this.cabFactura.descuento = this.compraAnterior.descuento;
      this.cabFactura.impuesto = this.compraAnterior.impuesto;
      this.cabFactura.total = this.compraAnterior.total;
    }
  },
});
</script>

<style scoped>
.v-row {
  margin: 0px 0px 0px;
}
</style>
