import { EDITAR, GUARDAR } from "@/services/crud";
import Swal from "sweetalert2";
import { SUBIR_ARCHIVO } from "@/services/almacenamiento";
import { BUSCAR_USUARIO_ACTUAL } from "@/services/usuarios";

export const CAPTURAR_CAMPOS: any = async (item: any, campos: any) => {
  const datos = {};
  if (item) {
    Object.values(item).forEach((value: any, index) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      datos[Object.keys(item)[index]] = value;
    });
  } else {
    for (const campo of campos) {
      if (campo.type === 10) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datos[campo.name] = await SUBIR_ARCHIVO(campo.model, "comprobantes");
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datos[campo.name] = campo.model;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (campo.name2) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          datos[campo.name2] = campo.model2;
        }
      }
    }
  }
  return datos;
};

export async function PROCESAR_FORMULARIO(
  coleccion: string,
  datos: any,
  campos: any,
  item: any
) {
  const datosUser: any = await BUSCAR_USUARIO_ACTUAL();
  const datosMovimiento: any = {
    entidad: coleccion,
    created_at: new Date(),
    responsable: datosUser.nombres + " " + datosUser.apellidos,
    documento: datosUser.documento,
    email: datosUser.email,
  };
  if (!item) {
    await GUARDAR(coleccion, datos);
    await Swal.fire({
      title: "Registro exitoso",
      html: "Datos registrados",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    datosMovimiento.accion = "Registró";
    datosMovimiento.objeto = JSON.stringify(datos);
    await GUARDAR("movimientos", datosMovimiento);
  } else {
    await EDITAR(coleccion, item.id, datos);
    await Swal.fire({
      title: "Actualización exitosa",
      html: "Datos actualizados",
      icon: "success",
      showConfirmButton: false,
      timer: 1000,
    });
    datosMovimiento.accion = "Editó";
    item.created_at = null;
    datos.created_at = null;
    item.updated_at = null;
    datos.updated_at = null;
    datosMovimiento.objeto = JSON.stringify(item);
    datosMovimiento.objeto_edit = JSON.stringify(datos);
    await GUARDAR("movimientos", datosMovimiento);
  }
  campos.forEach((campo: any) => {
    if (campo.type === 10) {
      campo.model = null;
    } else {
      campo.model = "";
      campo.model2 = "";
    }
  });
}

export const ASIGNAR_PERMISOS = (rol: string, listas: any, permisos: any) => {
  const listasDispo = [{}];
  permisos.forEach((permiso: any, index: number) => {
    if (permiso.tipo === rol) {
      listas.forEach((lista: any) => {
        if (lista.id) {
          permisos[index].idDisponibles.forEach((id: number) => {
            if (lista.id === id) {
              listasDispo.push(lista);
            }
          });
        } else {
          listasDispo.push(lista);
        }
      });
    }
  });
  return listasDispo;
};

export const VALIDAR_CAMPOSNULOS = (obj: any) => {
  let value = true;
  Object.keys(obj).forEach((key) => {
    if (!obj[key] || obj[key] < 0) {
      value = false;
    }
  });
  return value;
};

export const ASIGNAR_ITEMS_DASHBOARD = (lista: any[], rol: any) => {
  lista.map((item: any, index) => {
    const roles = item.roles;
    const items = item.items;
    if (roles) {
      if (roles.includes(rol)) {
        items.map((subItem: any, subindex: number) => {
          const subRoles = subItem.roles;
          if (subRoles) {
            if (!subRoles.includes(rol)) {
              items.splice(subindex, 1);
            }
          }
        });
      } else {
        lista.splice(index, 1);
      }
    }
  });
  return lista;
};

export const REDONDEAR = (num: number, exp: number) => {
  const pow = Math.pow(10, Math.abs(exp));
  return exp > 0 ? Math.round(num * pow) / pow : Math.round(num / pow) * pow;
};
