<template>
  <div>
    <v-text-field
      type="string"
      label="Ingrese Documento del cliente"
      v-model="docClient"
    ></v-text-field>
    <v-btn :disabled="docClient.length < 7" @click="findTransactionsByClient">
      Consultar
    </v-btn>
    <div>{{ transactions }}</div>
  </div>
</template>

<script lang="ts">
import { Transaction } from "@/domain/model/transaction/Transaction";
import { LIST_TRANSACTION_BY_CLIENT } from "@/domain/useCase/transactionUseCase/transactionUseCase";
import Vue from "vue";

export default Vue.extend({
  name: "BillToCharge",
  data: () => ({
    docClient: "",
    transactions: [] as Array<Transaction>,
  }),
  methods: {
    async findTransactionsByClient() {
      this.transactions = await LIST_TRANSACTION_BY_CLIENT(this.docClient);
    },
  },
});
</script>
