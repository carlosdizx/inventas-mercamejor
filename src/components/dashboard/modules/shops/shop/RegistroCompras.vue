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
            <v-col cols="8">
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
            <v-col cols="3" v-if="false">
              <validation-provider
                v-slot="{ errors }"
                name="Tipo de Compra"
                rules="required"
              >
                <v-select
                  :disabled="anular"
                  label="Tipo de Compra"
                  v-model="shop.tipo_compra"
                  :error-messages="errors"
                  :items="tiposDocumento"
                  outlined
                  dense
                ></v-select>
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
                      v-model="shop.cod_factura"
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
                    :value="'C-' + shop.cod_factura"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col cols="3" v-if="false">
              <validation-provider
                v-slot="{ errors }"
                name="Tipo de Pago"
                rules="required"
              >
                <v-select
                  :disabled="anular"
                  label="Tipo de Pago"
                  v-model="shop.tipo_pago"
                  :error-messages="errors"
                  :items="tiposPagos"
                  outlined
                  dense
                ></v-select>
              </validation-provider>
            </v-col>
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
            :compras="shop.compras"
            @enviarProductos="actualizarProductos"
            :eliminarDatos="eliminarDatos"
          />

          <v-row class="mr-5 ml-5">
            <v-col>
              <v-text-field
                :disabled="anular"
                label="Subtotal"
                readonly
                v-model.number="shop.subtotal"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                :disabled="anular"
                @input="calcularTotal()"
                label="Descuento"
                v-model.number="shop.descuento"
                type="number"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                :disabled="anular"
                label="Impuesto"
                @input="calcularTotal()"
                v-model.number="shop.impuesto"
                type="number"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5">
            <v-col class="text-center">
              <h2 class="text-gray">Total: ${{ shop.total }}</h2>
            </v-col>
          </v-row>
          <v-row class="mr-5 ml-5" v-if="!compraAnterior">
            <v-col>
              <v-btn
                @click="registrarCompra()"
                :disabled="validarRegistro"
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
import { ICompra, EstadoCompra } from "@/models/Compra";
import { IProductoCompra } from "@/models/ProductoCompra";
import { ANULAR_COMPRA, REGISTRAR_NUEVA_COMPRA } from "@/services/compras";
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
      type: Object as PropType<ICompra>,
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
      shop: {} as ICompra,
      showClients: false,
    };
  },
  computed: {
    validarRegistro() {
      let val = false;
      if (
        this.shop.cod_factura === "" ||
        !this.shop.fec_documento ||
        !this.shop.tipo_pago ||
        !this.shop.tipo_compra ||
        this.shop.total < this.shop.descuento - this.shop.impuesto ||
        this.shop.total <= 0 ||
        this.shop.descuento < 0 ||
        this.shop.impuesto < 0
      ) {
        val = true;
      }
      return val;
    },
    nombresProveedor() {
      let nombres = "Proveedores Varios";
      if (this.shop.nom_proveedor) {
        nombres = this.shop.nom_proveedor + " " + this.shop.ape_proveedor;
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
      let nombres = "";
      let apellidos = "";
      this.proveedores.forEach((prov: any) => {
        if (this.doc_proveedor === prov.documento) {
          nombres = prov.nombres;
          apellidos = prov.apellidos;
        }
      });
      this.shop.nom_proveedor = nombres;
      this.shop.ape_proveedor = apellidos;
    },
    actualizarProductos(productos: IProductoCompra[]) {
      const productoss: Array<IProductoCompra> = productos;
      this.shop.compras = productoss;
      const shop: ICompra = {
        descuento: 0,
        impuesto: 0,
        doc_proveedor: this.shop.doc_proveedor || 0,
        nom_proveedor: this.shop.nom_proveedor || "",
        ape_proveedor: this.shop.ape_proveedor || "",
        fec_documento: this.shop.fec_documento || "",
        cod_factura: this.shop.cod_factura,
        tipo_compra: this.shop.tipo_compra,
        tipo_pago: this.shop.tipo_pago,
        fecha_pago: this.shop.fecha_pago || "",
        fecha_llegada: this.shop.fecha_llegada || "",
        compras: productos,
        subtotal: 0,
        total: 0,
        estado: EstadoCompra.APROBADO,
        created_at: new Date(),
        updated_at: new Date(),
        caja: "",
      };
      this.shop = shop;
      this.calcularSubtotal();
      this.calcularTotal();
    },
    calcularSubtotal() {
      let subtototal = 0;
      this.shop.compras.forEach((com: IProductoCompra) => {
        subtototal += Number(com.subtotal);
      });
      this.shop.subtotal = subtototal;
    },
    calcularTotal() {
      this.shop.total =
        Number(this.shop.subtotal) -
        Number(this.shop.descuento) +
        Number(this.shop.impuesto);
    },
    async registrarCompra() {
      this.shop.created_at = new Date();
      this.shop.updated_at = new Date();
      this.shop.fec_documento = getFechaDesdeInput(this.fec_documento);
      this.shop.fecha_pago = getFechaDesdeInput(this.fecha_pago);
      this.shop.fecha_llegada = getFechaDesdeInput(this.fecha_llegada);
      Swal.fire({
        title: "¿Esta seguro de registrar esta compra?",
        showDenyButton: true,
        confirmButtonText: "Registrar",
        confirmButtonColor: "green",
        denyButtonText: `No aún no!`,
      }).then(async (result) => {
        if (
          result.isConfirmed &&
          (await REGISTRAR_NUEVA_COMPRA({ ...this.shop }))
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
          await ANULAR_COMPRA(this.idcompraanterior);
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
      this.shop.doc_proveedor = prov.doc_num;
      this.shop.nom_proveedor = prov.names;
      this.shop.ape_proveedor = prov.surnames;
      this.showClients = false;
    },
    limpiarCompra() {
      this.fec_documento = new Date().toISOString().slice(0, 10);
      this.fecha_pago = new Date().toISOString().slice(0, 10);
      this.fecha_llegada = new Date().toISOString().slice(0, 10);
      const shop: ICompra = {
        doc_proveedor: 0,
        nom_proveedor: "",
        ape_proveedor: "",
        cod_factura: "",
        tipo_pago: ETypesShop.COMPRA,
        tipo_compra: ETiposContadoCredito.CONTADO,
        compras: [],
        subtotal: 0,
        descuento: 0,
        impuesto: 0,
        total: 0,
        estado: EstadoCompra.APROBADO,
        fec_documento: new Date(),
        fecha_pago: new Date(),
        fecha_llegada: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        caja: "",
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
      this.shop.compras = [...this.compraAnterior.compras];
      this.shop.cod_factura =
        this.compraAnterior.cod_factura.split("-")[1] || "";
    }
  },
});
</script>
