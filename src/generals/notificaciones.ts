import Swal from "sweetalert2";

export const NOTIFICAR_ERROR = async (codigo: any) => {
  if (codigo === "auth/email-already-in-use") {
    await Swal.fire({
      title: "El correo ya está en uso",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
