<template>
  <v-container>
    <v-card>
      <v-card-title class="mr-5 ml-5">Registrar compra</v-card-title>
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <v-form @submit.prevent="crearCuenta">
          <v-card-text>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="NIT/Cédula"
                  rules="required"
                >
                  <v-text-field
                    label="NIT/Cédula"
                    v-model="cabFactura.nit"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Nombre del proveedor"
                  rules="required"
                >
                  <v-text-field
                    label="Nombre del proveedor"
                    v-model="cabFactura.nombreProveedor"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
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
                  ></v-text-field>
                  {{ numeroDocumento }}
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
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Bodega"
                  rules="required"
                >
                  <v-text-field
                    label="Bodega"
                    v-model="cabFactura.bodega"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <TablaCompras />
            <!-- <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider name="Bodega" rules="required">
                  <v-btn>Seleccionar</v-btn>
                </validation-provider>
              </v-col>
            </v-row> -->
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Subtotal"
                  rules="required"
                >
                  <v-text-field
                    label="Subtotal"
                    v-model="cabFactura.subtotal"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>

              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Descuento"
                  rules="required"
                >
                  <v-text-field
                    label="Descuento"
                    v-model="cabFactura.descuento"
                    :error-messages="errors"
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
                    v-model="cabFactura.impuesto"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <validation-provider
                  v-slot="{ errors }"
                  name="Total"
                  rules="required"
                >
                  <v-text-field
                    label="Total"
                    v-model="cabFactura.total"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row class="mr-5 ml-5">
              <v-col>
                <v-btn x-large class="success mb-3" block>Registrar</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
        <v-col v-if="!invalid">algo</v-col>
      </ValidationObserver>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import TablaCompras from "@/components/dashboard/modulos/compras/comprar/TablaCompras.vue";

export default Vue.extend({
  components: {
    TablaCompras,
  },
  data: () => ({
    cabFactura: {
      nombreProveedor: "",
      nit: "",
      fechaDocumento: "",
      nDocumento: "",
      tipoCompra: "Compra",
      tipoPago: "Contado",
      fechaPago: "",
      bodega: "",
      estado: "Pagado",
      fechaLlegadaProducto: "",
      subtotal: 0,
      descuento: 0,
      impuesto: 0,
      total: 0,
    },
    tiposDocumento: ["Compra", "Pedido"],
    tiposPagos: ["Contado", "Credito"],
  }),
  computed: {
    numeroDocumento() {
      return `${this.cabFactura.tipoCompra[0]}-${this.cabFactura.nDocumento}`;
    },
  },
});
</script>

<style scoped>
.v-row {
  margin: 0px 0px 0px;
}
</style>
