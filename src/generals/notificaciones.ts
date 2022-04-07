import Swal from "sweetalert2";

export const NOTIFICAR_ERROR = async (codigo: any) => {
  if (codigo === "auth/email-already-in-use") {
    await Swal.fire({
      title: "El correo ya está en uso",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (codigo === "auth/invalid-email") {
    await Swal.fire({
      title: "Correo invalido",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (codigo === "auth/wrong-password") {
    await Swal.fire({
      title: "Contraseña incorrecta",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (codigo === "auth/user-not-found") {
    await Swal.fire({
      title: "Correo no registrado",
      icon: "warning",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (codigo === "auth/user-disabled") {
    await Swal.fire({
      title: "Este usuario esta desabilitado",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
  } else if (codigo === "auth/admin-restricted-operation") {
    await Swal.fire({
      title: "Operación bloqueada!",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  } else if (codigo === "storage/object-not-found") {
    await Swal.fire({
      title: "Imagen no encontrada!",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
