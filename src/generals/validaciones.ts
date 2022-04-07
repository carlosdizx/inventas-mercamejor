import Swal from "sweetalert2";

export const VALIDAR_COMBO = async (modelo: any, items: Array<any>) => {
  if (modelo) {
    if (typeof modelo === "string") {
      await Swal.fire({
        timer: 1000,
        title: "Valor ingresado incorrecto",
        showConfirmButton: false,
        icon: "error",
      });
      return (modelo = "");
    }
    if (modelo.constructor.name === "Array") {
      let contador = 0;
      modelo.forEach((seleccionado: any, index: number) => {
        if (typeof seleccionado === "string") {
          modelo.splice(index, 1);
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
      return modelo;
    } else {
      return modelo;
    }
  }
};
