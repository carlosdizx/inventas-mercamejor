import Swal from "sweetalert2";

export const VALIDAR_COMBO = async (seleccionados: any[]) => {
  let contador = 0;
  seleccionados.forEach((seleccionado: any, index) => {
    if (typeof seleccionado === "string") {
      seleccionados.splice(index, 1);
      contador++;
    }
  });
  if (contador !== 0) {
    await Swal.fire({
      timer: 1000,
      title: "Valor ingresado incorrecto",
      showConfirmButton: false,
      icon: "error",
    });
  }
  return seleccionados;
};
