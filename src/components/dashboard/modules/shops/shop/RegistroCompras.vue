<template>
  <v-card>
    <v-card-title class="mr-5 ml-5" v-if="compraAnterior === undefined"
      >Registrar Compra</v-card-title
    >
    <v-card-title class="mr-5 ml-5" v-else>Anular Compra</v-card-title>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <v-form>
        <v-card-text>
          <v-row class="mr-5 ml-5">
            <v-col cols="6">
              <v-text-field
                :disabled="anular"
                label="NIT/Cédula proveedor"
                append-outer-icon="mdi-magnify"
                @click:append-outer="showClients = true"
                v-model="doc_proveedor"
                @input="buscarProveedor()"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <BuscarElemento
              :show="showClients"
              @getItem="seleccionarProveedor"
              @closeElement="showClients = false"
              nombre="Proveedores"
              :items="proveedores"
              :headers="columnas"
            />
            <v-col cols="6">
              <v-text-field
                :disabled="anular"
                label="Nombre del proveedor"
                v-model="nombresProveedor"
                readonly
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col cols="4">
              <validation-provider
                v-slot="{ errors }"
                name="Tipo de Pago"
                rules="required "
              >
                <v-select
                  :disabled="anular"
                  label="Tipo de Pago"
                  v-model="shop.type_pay"
                  :error-messages="errors"
                  :items="tiposPagos"
                  outlined
                  dense
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="4">
              <validation-provider
                v-slot="{ errors }"
                name="Fecha de Compra"
                rules="required"
              >
                <v-text-field
                  :disabled="anular"
                  label="Fecha de Compra"
                  v-model="fec_documento"
                  :error-messages="errors"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="4">
              <v-row>
                <v-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Número de Factura"
                    rules="required"
                  >
                    <v-text-field
                      :disabled="anular"
                      type="number"
                      label="Número de Factura"
                      v-model="shop.cod_purchase"
                      :error-messages="errors"
                      outlined
                      dense
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col>
                  <v-text-field
                    disabled
                    dense
                    :value="'C-' + shop.cod_purchase"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col v-if="false">
              <v-text-field
                :disabled="anular"
                label="Fecha de pago"
                type="date"
                v-model="fecha_pago"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col v-if="false">
              <v-text-field
                :disabled="anular"
                label="Fecha de llegada del producto"
                type="date"
                v-model="fecha_llegada"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <TablaCompras
            :anular="anular"
            :compras="shop.shops"
            @enviarProductos="actualizarProductos"
            :eliminarDatos="eliminarDatos"
          />
          <v-row class="mr-5 ml-5">
            <v-col class="text-center">
              <h2 class="text-gray">Total: ${{ shop.total }}</h2>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5" v-if="!compraAnterior">
            <v-col>
              <v-btn
                @click="registrarCompra()"
                :disabled="shop.shops.length == 0"
                color="color_a mb-3"
                x-large
                block
                >Registrar</v-btn
              >
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5" v-if="compraAnterior">
            <v-col>
              <v-btn @click="anularCompar()" x-large dark color="gray" block
                >Anular Compra</v-btn
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

import TablaCompras from "@/components/dashboard/modules/shops/shop/TablaCompras.vue";
import BuscarElemento from "@/components/crud/BuscarElemento.vue";
import { Purchase, EPayTypePurchase } from "@/domain/model/purchase/Purchase";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";
import {
  REGISTER_NEW_PURCHASE,
  CANCEL_PURCHASE,
} from "@/domain/useCase/purchase/purchaseSaveUseCase";
import { EEstadoVenta } from "@/domain/model/constants/Constants";

import Swal from "sweetalert2";
import { getFechaDesdeInput } from "@/generals/formats";
import { ETiposContadoCredito, ETypesShop } from "@/generals/Constantes";

export default Vue.extend({
  name: "RegistroCompras",
  components: {
    TablaCompras,
    BuscarElemento,
  },
  props: {
    compraAnterior: {
      type: Object as PropType<Purchase>,
    },
    idcompraanterior: String,
    anular: Boolean,
  },
  data() {
    return {
      columnas: COLUMNAS,
      tiposPagos: [ETiposContadoCredito.CONTADO, ETiposContadoCredito.CREDITO],
      tiposDocumento: [ETypesShop.COMPRA, ETypesShop.PEDIDO],
      proveedores: [""],
      eliminarDatos: false,
      doc_proveedor: "",
      fec_documento: "",
      fecha_pago: "",
      fecha_llegada: "",
      created_at: "",
      updated_at: "",
      shop: {} as Purchase,
      showClients: false,
    };
  },
  computed: {
    validarRegistro() {
      if (
        this.shop.shops.length <= 0 &&
        this.shop.doc_supp &&
        this.shop.type_pay &&
        this.shop.type_pay &&
        this.shop.total < this.shop.discount - this.shop.taxes &&
        this.shop.total <= 0 &&
        this.shop.discount < 0 &&
        this.shop.taxes < 0
      ) {
        return false;
      }
      return true;
    },
    nombresProveedor() {
      let nombres = "Proveedores Varios";
      if (this.shop.nam_supp) {
        nombres = this.shop.nam_supp + " " + this.shop.sur_supp;
      }
      return nombres;
    },
  },
  methods: {
    async listarProveedores() {
      this.proveedores = [];
      const res: any = await LISTAR_PROVEDOORES();
      res.forEach((prov: any) => this.proveedores.push(prov.data()));
    },
    buscarProveedor() {
      this.proveedores.forEach((prov: any) => {
        if (this.doc_proveedor === prov.doc_num) {
          this.shop.nam_supp = prov.names;
          this.shop.sur_supp = prov.surnames;
        }
      });
    },
    actualizarProductos(productos: ProductPurchase[]) {
      const productoss: Array<ProductPurchase> = productos;
      this.shop.shops = productoss;
      const shop: Purchase = {
        id: "",
        employee: "",
        discount: 0,
        taxes: 0,
        doc_supp: this.shop.doc_supp || 0,
        nam_supp: this.shop.nam_supp || "",
        sur_supp: this.shop.sur_supp || "",
        created_at: new Date(),
        updated_at: new Date(),
        type_pay: EPayTypePurchase.CONTADO,
        shops: productos,
        subtotal: 0,
        total: 0,
        state: EEstadoVenta.APROBADO,
        cash_register: "",
        cod_purchase: "",
      };
      this.shop = shop;
      this.calcularSubtotal();
      this.calcularTotal();
    },
    calcularSubtotal() {
      let subtototal = 0;
      this.shop.shops.forEach((com: ProductPurchase) => {
        subtototal += Number(com.subtotal);
      });
      this.shop.subtotal = subtototal;
    },
    calcularTotal() {
      this.shop.total =
        Number(this.shop.subtotal) -
        Number(this.shop.discount) +
        Number(this.shop.taxes);
    },
    async registrarCompra() {
      this.shop.created_at = new Date();
      this.shop.updated_at = new Date();
      this.shop.updated_at = getFechaDesdeInput(this.fec_documento);
      this.shop.created_at = getFechaDesdeInput(this.fecha_pago);
      Swal.fire({
        title: "¿Esta seguro de registrar esta compra?",
        showDenyButton: true,
        confirmButtonText: "Registrar",
        confirmButtonColor: "green",
        denyButtonText: `No aún no!`,
      }).then(async (result) => {
        if (
          result.isConfirmed &&
          (await REGISTER_NEW_PURCHASE({ ...this.shop }))
        ) {
          this.eliminarDatos = !this.eliminarDatos;
          this.limpiarCompra();
          const observer: any = this.$refs.observer;
          if (observer) {
            observer.reset();
          }
        }
      });
    },
    async anularCompar() {
      Swal.fire({
        title: "¿Esta seguro de Anular esta compra?",
        showDenyButton: true,
        confirmButtonText: "Anular",
        confirmButtonColor: "red",
        denyButtonText: `No!`,
        denyButtonColor: "gray",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await CANCEL_PURCHASE(this.idcompraanterior);
          this.eliminarDatos = !this.eliminarDatos;
          this.limpiarCompra();
          const observer: any = this.$refs.observer;
          if (observer) {
            observer.reset();
          }
        }
      });
    },
    seleccionarProveedor(prov: any) {
      this.doc_proveedor = prov.doc_num;
      this.shop.doc_supp = prov.doc_num;
      this.shop.nam_supp = prov.names;
      this.shop.sur_supp = prov.surnames;
      this.showClients = false;
    },
    limpiarCompra() {
      this.fec_documento = new Date().toISOString().slice(0, 10);
      this.fecha_pago = new Date().toISOString().slice(0, 10);
      this.fecha_llegada = new Date().toISOString().slice(0, 10);
      const shop: Purchase = {
        id: "",
        employee: "",
        doc_supp: 0,
        nam_supp: "",
        sur_supp: "",
        cod_purchase: "",
        type_pay: EPayTypePurchase.CONTADO,
        shops: [],
        subtotal: 0,
        discount: 0,
        taxes: 0,
        total: 0,
        state: EEstadoVenta.APROBADO,
        created_at: new Date(),
        updated_at: new Date(),
        cash_register: "",
      };
      this.shop = shop;
    },
  },
  created() {
    this.limpiarCompra();
    this.listarProveedores();
    this.columnas = this.columnas.filter((col: any) => {
      if (col.value !== "detalle") return true;
      return false;
    });
    if (this.compraAnterior) {
      this.shop = { ...this.compraAnterior };
      this.shop.shops = [...this.compraAnterior.shops];
      this.shop.cod_purchase =
        this.compraAnterior.cod_purchase.split("-")[1] || "";
    }
  },
});
</script>
