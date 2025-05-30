<template>
  <v-card>
    <v-card-title class="mr-5 ml-5" v-if="compraAnterior === undefined"
      >Registrar Compra</v-card-title
    >
    <v-card-title class="mr-5 ml-5" v-else>Anular Compra</v-card-title>
    <v-form @submit.prevent="handleSubmit(onSubmit)">
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
            <v-select
              :disabled="anular"
              label="Tipo de Pago"
              v-model="typePay"
              :error-messages="typePayError"
              :items="payTypes"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              :disabled="anular"
              label="Fecha de Compra"
              v-model="purchaseDate"
              :error-messages="purchaseDateError"
              type="date"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  :disabled="anular"
                  type="number"
                  label="Número de Factura"
                  v-model="invoiceNumber"
                  :error-messages="invoiceNumberError"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  disabled
                  dense
                  :value="'C-' + invoiceNumber"
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
          :compras="shop.sales"
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
              type="submit"
              :disabled="shop.sales.length == 0"
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
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useField, useForm } from 'vee-validate';
import { COLUMNAS } from "@/models/Proveedor";
import { LISTAR_PROVEDOORES } from "@/generals/Funciones";
import TablaCompras from "@/components/dashboard/modules/shops/shop/TablaCompras.vue";
import BuscarElemento from "@/components/crud/BuscarElemento.vue";
import { Purchase } from "@/domain/model/purchase/Purchase";
import { ProductPurchase } from "@/domain/model/productpurchase/ProductPurchase";
import {
  REGISTER_NEW_PURCHASE,
  CANCEL_PURCHASE,
} from "@/domain/useCase/purchase/purchaseSaveUseCase";
import {
  EEstatePurchase,
  EPayTypePurchase,
} from "@/domain/model/constants/Constants";
import Swal from "sweetalert2";
import { getFechaDesdeInput } from "@/generals/formats";
import { ETiposContadoCredito, ETypesShop } from "@/generals/Constantes";

export default defineComponent({
  name: "RegistroCompras",
  components: {
    TablaCompras,
    BuscarElemento
  },
  props: {
    compraAnterior: {
      type: Object as PropType<Purchase>,
    },
    idcompraanterior: {
      type: String,
      required: false,
      default: ''
    },
    anular: Boolean,
  },
  setup(props) {
    const { handleSubmit, resetForm } = useForm();
    const { value: typePay, errorMessage: typePayError } = useField<EPayTypePurchase>('type_pay', 'required');
    const { value: purchaseDate, errorMessage: purchaseDateError } = useField('purchase_date', 'required');
    const { value: invoiceNumber, errorMessage: invoiceNumberError } = useField('invoice_number', 'required');

    const onSubmit = async () => {
      if (props.idcompraanterior) {
        await CANCEL_PURCHASE(props.idcompraanterior);
      }
    };

    return {
      typePay,
      typePayError,
      purchaseDate,
      purchaseDateError,
      invoiceNumber,
      invoiceNumberError,
      handleSubmit,
      resetForm,
      onSubmit
    };
  },
  data() {
    return {
      columnas: COLUMNAS,
      payTypes: [EPayTypePurchase.CONTADO, EPayTypePurchase.CREDITO],
      tiposDocumento: [ETypesShop.COMPRA, ETypesShop.PEDIDO],
      proveedores: [""],
      eliminarDatos: false,
      doc_proveedor: "",
      fec_documento: "",
      fecha_pago: "",
      fecha_llegada: "",
      created_at: "",
      updated_at: "",
      shop: {
        id: "",
        employee: "",
        doc_supp: "",
        nam_supp: "",
        sur_supp: "",
        cod_purchase: "",
        type_pay: EPayTypePurchase.CONTADO,
        sales: [] as ProductPurchase[],
        subtotal: 0,
        discount: 0,
        taxes: 0,
        total: 0,
        state: EEstatePurchase.APROBADO,
        created_at: new Date(),
        updated_at: new Date(),
        cash_register: "",
      } as Purchase,
      showClients: false,
    };
  },
  computed: {
    validarRegistro() {
      if (
        this.shop.sales.length <= 0 &&
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
      this.shop.sales = productoss;
      const shop: Purchase = {
        id: "",
        employee: "",
        discount: 0,
        taxes: 0,
        doc_supp: this.shop.doc_supp || "",
        nam_supp: this.shop.nam_supp || "",
        sur_supp: this.shop.sur_supp || "",
        created_at: new Date(),
        updated_at: new Date(),
        type_pay: this.shop.type_pay,
        sales: productos,
        subtotal: 0,
        total: 0,
        state: EEstatePurchase.APROBADO,
        cash_register: "",
        cod_purchase: "",
      };
      this.shop = shop;
      this.calcularSubtotal();
      this.calcularTotal();
    },
    calcularSubtotal() {
      let subtototal = 0;
      this.shop.sales.forEach((com: ProductPurchase) => {
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
      if (!this.idcompraanterior) {
        Swal.fire({
          title: "Error",
          text: "No se puede anular la compra sin un ID válido",
          icon: "error"
        });
        return;
      }

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
        doc_supp: "",
        nam_supp: "",
        sur_supp: "",
        cod_purchase: "",
        type_pay: EPayTypePurchase.CONTADO,
        sales: [],
        subtotal: 0,
        discount: 0,
        taxes: 0,
        total: 0,
        state: EEstatePurchase.APROBADO,
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
      this.shop.sales = [...this.compraAnterior.sales];
      this.shop.cod_purchase =
        this.compraAnterior.cod_purchase.split("-")[1] || "";
    }
  },
});
</script>
