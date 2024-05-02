import { Client } from "@/domain/model/client/Client";
import { FIND_BY_QUERY } from "@/infrastructure/firebase/template/basicOperations";

const clientCollection = "clients";

export const FIND_CLIENT = async (document: string): Promise<Client | null> => {
  const result = await FIND_BY_QUERY(
    clientCollection,
    "doc_num",
    "==",
    document
  );
  if (result) {
    return result.data() as Client;
  }
  return null;
};
