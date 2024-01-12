<template>
  <div>
    <v-text-field
      type="string"
      label="Ingrese Documento del cliente"
      v-model="docClient"
    ></v-text-field>
    <v-btn :disabled="docClient.length < 7" @click="findClient">
      Consultar
    </v-btn>
    <div>Total: {{ balance }}</div>
    <div v-if="balance > 0">
      <v-text-field
        type="string"
        label="Ingrese Valor de abono"
        v-model="amountToPay"
      ></v-text-field>
      <v-btn
        :disabled="amountToPay <= 0 || amountToPay > balance"
        @click="makePayment"
      >
        Abonar
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CONSULT_BALANCE_BILL_TO_PAY,
  PAYMENT_BILL_TO_PAY,
} from "@/domain/useCase/billtocharge/billToChargeUseCase";
import Vue from "vue";

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
      await PAYMENT_BILL_TO_PAY(this.docClient, this.amountToPay);
      this.findClient();
    },
  },
});
</script>
