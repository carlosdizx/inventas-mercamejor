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
                v-model.number="compra.documento_proveedor"
                @input="buscarProveedor()"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="1" class="mt-2">
              <BuscarElemento
                @getItem="seleccionarProveedor"
                icon="mdi-lead-pencil"
                nombre="Proveedor"
                :items="proveedores"
                :headers="columnas"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Nombre del proveedor"
                v-model="nombresProveedor"
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
              <v-text-field
                label="Fecha de pago"
                type="date"
                v-model="compra.fecha_pago"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Fecha de llegada del producto"
                type="date"
                v-model="compra.fecha_llegada_producto"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <TablaCompras
            :compras="compra.compras"
            @enviarProductos="actualizarProductos"
            :eliminarDatos="eliminarDatos"
          />

          <v-row class="mr-5 ml-5">
            <v-col>
              <v-text-field
                label="Subtotal"
                readonly
                v-model.number="compra.subtotal"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                @input="calcularTotal()"
                label="Descuento"
                v-model.number="compra.descuento"
                type="number"
                outlined
                dense
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                label="Impuesto"
                @input="calcularTotal()"
                v-model.number="compra.impuesto"
                type="number"
                outlined
                dense
              ></v-text-field>
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
              <v-btn
                @click="actualizarCompa()"
                :disabled="validarRegistro"
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

import TablaCompras from "@/components/dashboard/modulos/compras/comprar/TablaCompras.vue";
import BuscarElemento from "@/components/crud/BuscarElemento.vue";
import { Compra, EstadoCompra } from "@/interfaces/Compra";
import { ProductoCompra } from "@/interfaces/ProductoCompra";
import { REGISTRAR_NUEVA_COMPRA } from "@/services/compras";
import Swal from "sweetalert2";

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
      eliminarDatos: false,
    };
  },
  computed: {
    validarRegistro() {
      let val = false;
      if (
        this.compra.cod_factura === "" ||
        !this.compra.fecha_documento ||
        !this.compra.tipo_pago ||
        !this.compra.tipo_compra ||
        this.compra.total < this.compra.descuento - this.compra.impuesto ||
        this.compra.total <= 0 ||
        this.compra.descuento < 0 ||
        this.compra.impuesto < 0
      ) {
        val = true;
      }
      return val;
    },
    nombresProveedor() {
      let nombres = "Proveedores Varios";
      if (this.compra.nombres_proveedor) {
        nombres =
          this.compra.nombres_proveedor + " " + this.compra.apellidos_proveedor;
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
        if (this.compra.documento_proveedor === prov.documento) {
          nombres = nombres = prov.nombres;
          apellidos = prov.apellidos;
        }
      });
      this.compra.nombres_proveedor = nombres;
      this.compra.apellidos_proveedor = apellidos;
    },
    actualizarProductos(productos: ProductoCompra[]) {
      const productoss: Array<ProductoCompra> = productos;
      this.compra.compras = productoss;
      const compra: Compra = {
        descuento: 0,
        impuesto: 0,
        documento_proveedor: this.compra.documento_proveedor || "",
        nombres_proveedor: this.compra.nombres_proveedor || "",
        apellidos_proveedor: this.compra.apellidos_proveedor || "",
        fecha_documento: this.compra.fecha_documento || "",
        cod_factura: this.compra.cod_factura,
        tipo_compra: this.compra.tipo_compra,
        tipo_pago: this.compra.tipo_pago,
        fecha_pago: this.compra.fecha_pago || "",
        fecha_llegada_producto: this.compra.fecha_llegada_producto || "",
        compras: productos,
        subtotal: 0,
        total: 0,
        estado: EstadoCompra.APROBADO,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.compra = compra;
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
      Swal.fire({
        title: "¿Esta seguro de registrar esta compra?",
        showDenyButton: true,
        confirmButtonText: "Registrar",
        confirmButtonColor: "green",
        denyButtonText: `No aún no!`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await REGISTRAR_NUEVA_COMPRA(this.compra);
          this.eliminarDatos = !this.eliminarDatos;
          this.limpiarCompra();
          const observer: any = this.$refs.observer;
          if (observer) {
            observer.reset();
          }
        }
      });
    },
    // actualizarCompa() {
    //   this.compra.updated_at = new Date();
    //   this.compra.documento_proveedor = this.compra.documento_proveedor;
    //   Swal.fire({
    //     title: "¿Esta seguro de Actualizar esta compra?",
    //     showDenyButton: true,
    //     confirmButtonText: "Actualizar",
    //     confirmButtonColor: "green",
    //     denyButtonText: `Cancelar!`,
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       let existe = false;
    //       const res = await LISTAR_IN(
    //         "compras",
    //         "cod_factura",
    //         this.compra.cod_factura
    //       );
    //       res.forEach((val: any) => {
    //         if (val.exists) {
    //           existe = true;
    //         }
    //       });
    //       if (!existe) {
    //         await GUARDAR("compras", this.compra);
    //         const inventarios: Array<Inventarios> = [];
    //         this.compra.compras.forEach((compra) => {
    //           const inventario: Inventarios = {
    //             created_at: new Date(),
    //             updated_at: new Date(),
    //             fecha_factura: new Date(String(this.compra.fecha_documento)),
    //             cedula_nit: this.compra.documento_proveedor,
    //             nombres: this.compra.nombres_proveedor,
    //             apellidos: this.compra.apellidos_proveedor,
    //             tipo_factura: this.compra.tipo_compra,
    //             documento: this.compra.cod_factura,
    //             bodega: compra.bodega,
    //             producto: compra.descripcion_producto,
    //             codigo_barras: compra.codigo_barras,
    //             salidas: compra.cantidad,
    //             entradas: 0,
    //             cruce: "",
    //             caja: "",
    //           };
    //           inventarios.push(inventario);
    //         });
    //         for (const item of inventarios) {
    //           await GUARDAR("inventarios", item);
    //         }
    //         this.eliminarDatos = !this.eliminarDatos;
    //         this.limpiarCompra();
    //         await Swal.fire({
    //           title: "Compra actualizada con éxito",
    //           icon: "success",
    //           timer: 1000,
    //           showConfirmButton: false,
    //         });
    //       } else {
    //         await Swal.fire({
    //           title: "Número de factura ya existe",
    //           icon: "warning",
    //           timer: 1000,
    //           showConfirmButton: false,
    //         });
    //       }
    //     }
    //   });
    // },
    seleccionarProveedor(prov: any) {
      this.compra.documento_proveedor = prov.documento;
      this.compra.nombres_proveedor = prov.nombres;
      this.compra.apellidos_proveedor = prov.apellidos;
    },
    limpiarCompra() {
      const compra: Compra = {
        documento_proveedor: "",
        nombres_proveedor: "",
        apellidos_proveedor: "",
        fecha_documento: "",
        cod_factura: "",
        tipo_compra: "",
        tipo_pago: "",
        fecha_pago: "",
        fecha_llegada_producto: "",
        compras: [],
        subtotal: 0,
        descuento: 0,
        impuesto: 0,
        total: 0,
        estado: EstadoCompra.APROBADO,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.compra = compra;
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
