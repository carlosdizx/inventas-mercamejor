<template>
  <v-card>
    <v-card-title class="mr-5 ml-5" v-if="this.compraAnterior === undefined"
      >Registrar compra</v-card-title
    >
    <v-card-title class="mr-5 ml-5" v-else>Actualizar compra</v-card-title>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form @submit.prevent="crearCuenta">
        <v-card-text>
          <v-row class="mr-5 ml-5">
            <v-col cols="5">
              <v-text-field
                label="NIT/Cédula proveedor"
                v-model="compra.documento_proveedor"
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
                v-model="compra.nombre_proveedor"
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
                  v-model="compra.fecha_documento"
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
                  v-model="compra.tipo_compra"
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
                  v-model="compra.cod_factura"
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
                  v-model="compra.tipo_pago"
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
                  v-model="compra.fecha_pago"
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
                  v-model="compra.fecha_llegada_producto"
                  :error-messages="errors"
                  outlined
                  dense
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <TablaCompras
            :compras="compra.compras"
            @enviarProductos="actualizarProductos"
          />

          <v-row class="mr-5 ml-5">
            <v-col>
              <v-text-field
                label="Subtotal"
                readonly
                v-model="compra.subtotal"
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
                  v-model="compra.descuento"
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
                  v-model="compra.impuesto"
                  :error-messages="errors"
                  outlined
                  dense
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col class="text-center">
              <h2 class="text-gray">Total: ${{ compra.total }}</h2>
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
import Vue, { PropType } from "vue";

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
      type: Object as PropType<Compra>,
    },
  },
  data() {
    return {
      columnas: COLUMNAS,
      compra: {} as Compra,
      tiposDocumento: ["Compra", "Pedido"],
      tiposPagos: ["Contado", "Credito"],
      proveedores: [""],
    };
  },
  computed: {
    validarRegistro() {
      let val = false;
      if (
        this.compra.total < 1 ||
        this.compra.descuento < this.compra.total ||
        this.compra.compras.length === 0
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
        if (Number(this.compra.documento_proveedor) === prov.documento) {
          result = `${prov.nombres} ${prov.apellidos}`;
        }
      });
      this.compra.nombre_proveedor = result;
    },
    resetCampos() {
      this.compra.nombre_proveedor = "Proveedores varios";
      this.compra.documento_proveedor = 0;
      this.compra.fecha_documento = new Date();
      this.compra.cod_factura = "";
      this.compra.tipo_compra = "Compra";
      this.compra.tipo_pago = "Contado";
      this.compra.fecha_pago = new Date();
      this.compra.fecha_llegada_producto = new Date();
      this.compra.compras = [];
      this.compra.subtotal = 0;
      this.compra.descuento = 0;
      this.compra.impuesto = 0;
      this.compra.total = 0;
    },
    actualizarProductos(productos: any) {
      this.compra.compras = productos;
      this.calcularSubtotal();
      this.calcularTotal();
    },
    calcularSubtotal() {
      let subtototal = 0;
      this.compra.compras.forEach((com: any) => {
        subtototal += Number(com.subtotal);
      });
      this.compra.subtotal = subtototal;
    },
    calcularTotal() {
      this.compra.total =
        Number(this.compra.subtotal) -
        Number(this.compra.descuento) +
        Number(this.compra.impuesto);
    },
    async registrarCompra() {
      this.compra.created_at = new Date();
      this.compra.updated_at = new Date();
      this.compra.documento_proveedor = Number(this.compra.documento_proveedor);
      await GUARDAR("compras", this.compra);
      this.resetCampos();
    },
    seleccionarProveedor(prov: any) {
      this.compra.documento_proveedor = prov.documento;
      this.compra.nombre_proveedor = `${prov.nombres} ${prov.apellidos}`;
    },
  },
  created() {
    this.listarProveedores();
    this.columnas = this.columnas.filter((col: any) => {
      if (col.value !== "detalle") return true;
      return false;
    });
    if (this.compraAnterior) {
      this.compra = this.compraAnterior;
    }
  },
});
</script>

<style scoped>
.v-row {
  margin: 0px 0px 0px;
}
</style>
