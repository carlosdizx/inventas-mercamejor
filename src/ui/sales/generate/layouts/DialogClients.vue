<template>
  <div>
    <v-dialog v-model="dialog_list" persistent max-width="900" scrollable>
      <v-card class="modal-card">
        <v-card-title class="modal-header">
          <div class="d-flex align-center">
            <v-icon class="mr-3" color="primary" size="24">mdi-account-search</v-icon>
            <span class="text-h5" style="font-weight: 500; color: #333;">Buscar Clientes</span>
          </div>
        </v-card-title>
        <v-card-text class="modal-content">
          <Tabla
            coleccion="clients"
            titulo="clientes"
            :columnas="columnas"
            :campos_form="campos_form"
            :validaciones="validaciones"
            no-editar
            no-crear
            v-on:enviarSeleccionado="cambiarCliente($event)"
          />
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-spacer></v-spacer>
          <v-btn 
            color="red" 
            text 
            @click="cerrarModal"
            class="cancel-btn"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Tabla from "@/components/crud/Tabla.vue";
import { CAMPOS, VALIDACIONES } from "@/models/Cliente";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DialogClients",
  components: { Tabla },
  data: () => ({
    dialog_list: false,
    columnas: [
      { text: "Nombres", value: "names" },
      { text: "Apellidos", value: "surnames" },
      { text: "Documento", value: "doc_num" },
      { text: "Dirección", value: "address" },
      { text: "Selección", value: "seleccion" },
    ],
    campos_form: CAMPOS,
    validaciones: VALIDACIONES,
  }),
  methods: {
    abrirModal() {
      this.dialog_list = true;
      this.$emit("dialog", this.dialog_list);
    },
    cerrarModal() {
      this.dialog_list = false;
      this.$emit("dialog", this.dialog_list);
    },
    cambiarEstado() {
      this.dialog_list = !this.dialog_list;
      this.$emit("dialog", this.dialog_list);
    },
    cambiarCliente(cliente: any) {
      this.cerrarModal();
      this.$emit("cliente", cliente);
    },
  },
});
</script>

<style scoped>
.modal-card {
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
}

.modal-header {
  background-color: #f8f9fa !important;
  border-radius: 12px 12px 0 0 !important;
  padding: 20px 24px !important;
}

.modal-content {
  padding: 0 !important;
  background-color: #fff !important;
}

.modal-actions {
  background-color: #f8f9fa !important;
  border-radius: 0 0 12px 12px !important;
  padding: 16px 24px !important;
}

.close-btn {
  background-color: transparent !important;
  box-shadow: none !important;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.04) !important;
}

.cancel-btn {
  font-weight: 500 !important;
  text-transform: none !important;
  letter-spacing: 0.5px !important;
}

.custom-field {
  border-radius: 8px !important;
}

.custom-field .v-input__control .v-input__slot {
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  background-color: #fafafa !important;
}

.custom-field .v-input__control .v-input__slot:hover {
  border-color: #bdbdbd !important;
}

.custom-field .v-input__control .v-input__slot.v-input__slot--focused {
  border-color: #1976d2 !important;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1) !important;
}

.custom-field .v-label {
  color: #666 !important;
  font-weight: 400 !important;
}

.custom-field.v-input--is-readonly .v-input__control .v-input__slot {
  background-color: #fafafa !important;
  border-color: #e0e0e0 !important;
}

.custom-field.v-input--is-readonly .v-label {
  color: #666 !important;
}

.search-btn {
  background-color: #f5f5f5 !important;
  border: 1px solid #e0e0e0 !important;
  border-radius: 8px !important;
  color: #666 !important;
}

.search-btn:hover {
  background-color: #eeeeee !important;
  border-color: #bdbdbd !important;
}
</style>
