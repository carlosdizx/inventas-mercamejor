import { Client } from "@/domain/model/client/Client";
import { LIST_IN } from "@/infrastructure/firebase/template/basicOperations";

const clientCollection = "clients";

export const FIND_CLIENT = async (document: string): Promise<Client | null> => {
  const results = await LIST_IN(clientCollection, document, "doc_num");
  if (!results.empty) {
    return results.docs[0].data() as Client;
  }
  return null;
};
