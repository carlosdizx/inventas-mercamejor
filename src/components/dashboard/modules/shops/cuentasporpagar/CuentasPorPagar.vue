<template>
  <v-container>
    <v-card>
      <v-card-title>Cuentas por pagar</v-card-title>
      <v-card-text>
        <v-row>
          <v-container>
            <v-btn @click="mostrar = true" class="primary">Buscar compra</v-btn>
            <v-col cols="2">
              <v-text-field
                type="date"
                label="Ingrese fecha pago"
                v-model="fechaRegistro"
              ></v-text-field>
            </v-col>
            <v-dialog v-model="mostrar">
              <v-card>
                <Tabla
                  coleccion="cuentas_por_pagar"
                  titulo="Cuentas por pagar"
                  :columnas="columnas"
                  seleccion
                  NoEditar
                  noCrear
                  @getItem="seleccionarItem"
                  :consulta="[['estado', '==', 'Pendiente']]"
                ></Tabla>
              </v-card>
              <div class="mt-6 mb-6 text-center">
                <v-btn @click="mostrar = false" class="primary">Cerrar</v-btn>
              </div>
            </v-dialog>
          </v-container>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Cédula</th>
                <th class="text-left">Nombres</th>
                <th class="text-left">Apellidos</th>
                <th class="text-left">Cruzar (factura)</th>
                <th class="text-left">Valor Pendiente</th>
                <th class="text-left">Valor Total</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody v-if="idCuentaPorPagar !== ''">
              <tr>
                <td>{{ cuentaPorPagar.cedula_proveedor }}</td>
                <td>{{ cuentaPorPagar.nom_proveedor }}</td>
                <td>{{ cuentaPorPagar.ape_proveedor }}</td>
                <td>{{ cuentaPorPagar.codigo_factura }}</td>
                <td>
                  <v-text-field v-model.number="valorAbono"></v-text-field>
                </td>
                <td>{{ cuentaPorPagar.valor_debido }}</td>
                <td>
                  <v-btn
                    :disabled="!validarAbonoBoton"
                    @click="realizarAbono()"
                    class="success"
                    >Abonar</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";

import {
  COLUMNAS,
  ICuentaPorPagar,
  EstadoCuentaPorPagar,
} from "@/models/CuentasPorPagar";
import { MovCuentaPorPagar } from "@/models/MovCuentasPorPagar";

import Tabla from "@/components/crud/Tabla.vue";
import { EDITAR, GUARDAR } from "@/services/crud";

export default Vue.extend({
  name: "CuentasPorPagar",
  data: () => ({
    mostrar: false,
    columnas: COLUMNAS,
    fechaRegistro: "",
    cuentaPorPagar: {} as ICuentaPorPagar,
    idCuentaPorPagar: "",
    valorAbono: 0,
  }),
  components: {
    Tabla,
  },
  computed: {
    validarAbonoBoton() {
      if (
        this.cuentaPorPagar.valor_debido - this.valorAbono >= 0 ||
        this.valorAbono < 0
      )
        return true;
      return false;
    },
  },
  methods: {
    seleccionarItem(item: any) {
      this.mostrar = false;
      this.cuentaPorPagar = item;
      this.valorAbono = item.valor_debido;
      this.idCuentaPorPagar = item.id;
    },
    async realizarAbono() {
      Swal.fire({
        title:
          "¿Esta seguro que desea realizar este pago por valor de " +
          this.valorAbono +
          " ?",
        showDenyButton: true,
        confirmButtonText: "Pagar",
        confirmButtonColor: "green",
        denyButtonText: `No aún no!`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const nuevaCuentaPorPagar: ICuentaPorPagar = {
            ...this.cuentaPorPagar,
            updatedAt: new Date(),
          };
          if (nuevaCuentaPorPagar.valor_debido - this.valorAbono <= 0) {
            nuevaCuentaPorPagar.estado = EstadoCuentaPorPagar.COMPLETADO;
          }
          nuevaCuentaPorPagar.valor_debido =
            nuevaCuentaPorPagar.valor_debido - this.valorAbono;
          const nuevoMovimiento: MovCuentaPorPagar = {
            fecha_mov: new Date(this.fechaRegistro),
            cedula_empleado: "",
            nombres_empleado: "nombres",
            apellidos_empleado: "apellidos",
            caja: "Caja1",
            cuenta_por_pagar: "CxP-1",
            cruce: nuevaCuentaPorPagar.codigo_factura,
            valor: this.valorAbono,
            estado: EstadoCuentaPorPagar.REALIZADO,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          await EDITAR(
            "cuentas_por_pagar",
            this.idCuentaPorPagar,
            nuevaCuentaPorPagar
          );
          await GUARDAR("mov_cuentas_por_pagar", nuevoMovimiento);
          this.limpiarDatos();
        }
      });
    },
    limpiarDatos() {
      this.idCuentaPorPagar = "";
    },
  },
  created() {
    this.fechaRegistro = new Date().toISOString().slice(0, 10);
  },
});
</script>
