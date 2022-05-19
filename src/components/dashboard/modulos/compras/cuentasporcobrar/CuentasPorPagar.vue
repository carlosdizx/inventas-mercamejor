<template>
  <v-container>
    <v-card>
      <v-card-title>Cuentas por pagar</v-card-title>
      <v-card-text>
        <v-text-field label="Ingrese fecha"></v-text-field>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>name</td>
                <td>categoria</td>
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
export default Vue.extend({
  name: "CuentasPorPagar",
});
</script>
