<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-text-field
          label="Ingrese Documento del cliente"
          v-model="docClient"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn :disabled="docClient.length < 7" @click="findClient" block>
          Consultar
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="balance > 0" justify="center">
      <v-col cols="12" md="8" lg="6">
        <div>Total: {{ balance }}</div>
      </v-col>
    </v-row>

    <v-row v-if="balance > 0" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-text-field
          label="Ingrese Valor de abono"
          v-model="amountToPay"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="balance > 0" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn
          :disabled="amountToPay <= 0 || amountToPay > balance"
          @click="makePayment"
          block
        >
          Abonar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  CONSULT_BALANCE_BILL_TO_PAY,
  PAYMENT_BILL_TO_PAY,
} from "@/domain/useCase/billtocharge/billToChargeUseCase";
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "BillToCharge",
  data: () => ({
    docClient: "",
    balance: 0,
    amountToPay: 0,
  }),
  methods: {
    async findClient() {
      const balance = await CONSULT_BALANCE_BILL_TO_PAY(this.docClient);
      this.balance = balance;
      this.amountToPay = balance;
    },
    async makePayment() {
      await Swal.fire({
        title: "Seguro quiere continuar?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Pagado!", "", "success");
          PAYMENT_BILL_TO_PAY(this.docClient, this.amountToPay);
          this.findClient();
        } else if (result.isDenied) {
          Swal.fire("No se realizo el pago", "", "info");
        }
      });
    },
  },
});
</script>
