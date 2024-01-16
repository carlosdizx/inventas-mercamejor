<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-text-field
          type="string"
          label="Ingrese Documento del cliente"
          v-model="docClient"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn
          :disabled="docClient.length < 7"
          @click="findTransactionsByClient"
          block
        >
          Consultar
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="transactions.length > 0" justify="center">
      <v-col cols="12">
        <div class="text-center">
          <v-simple-table class="mx-auto max-width-xl">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Documento</th>
                  <th class="text-center">Tipo de pago</th>
                  <th class="text-center">Monto</th>
                  <th class="text-center">Fecha</th>
                  <th class="text-center">Referencia</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td class="text-center">{{ transaction.document }}</td>
                  <td
                    :class="{
                      'green--text': transaction.type === 'PAGOCXC',
                      'red--text': transaction.type !== 'PAGOCXC',
                    }"
                    class="text-center"
                  >
                    {{ transaction.type }}
                  </td>

                  <td class="text-center">{{ transaction.amount }}</td>
                  <td class="text-center">
                    {{ formatDate(transaction.updated_at.seconds) }}
                  </td>
                  <td class="text-center">{{ transaction.reference }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Transaction } from "@/domain/model/transaction/Transaction";
import { LIST_TRANSACTION_BY_CLIENT } from "@/domain/useCase/transactionUseCase/transactionUseCase";
import Vue from "vue";
import Swal from "sweetalert2";

export default Vue.extend({
  name: "BillToCharge",
  data: () => ({
    docClient: "",
    transactions: [] as Array<Transaction>,
  }),
  methods: {
    async findTransactionsByClient() {
      this.transactions = await LIST_TRANSACTION_BY_CLIENT(this.docClient);
      if (this.transactions.length === 0) {
        Swal.fire({
          title: "Este cliente no tiene registros",
          icon: "error",
        });
      }
    },
    formatDate(timestamp: number): string {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString();
    },
  },
});
</script>
