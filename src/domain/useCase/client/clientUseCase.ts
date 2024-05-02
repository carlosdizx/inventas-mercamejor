import { Client } from "@/domain/model/client/Client";
import { FIND_CLIENT } from "@/infrastructure/firebase/adapter/client/clientAdapter";

export const FIND_CLIENT_BY_DOCUMENT = async (
  documento: string
): Promise<Client | null> => {
  const client = await FIND_CLIENT(documento);
  console.log(documento);
  if (client) {
    return client;
  } else {
    return null;
  }
};
