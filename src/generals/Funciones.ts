import {LISTAR} from "@/services/crud";

export const LISTAR_ROLES = async () => await LISTAR("roles");
