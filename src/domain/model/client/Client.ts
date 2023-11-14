import { GENDERS } from "../constants/Constants";

export interface Client {
  gender: GENDERS;
  names: string;
  surnames: string;
  phone: string;
  doc_type: string;
  doc_num: string;
  email: string;
  address: string;
  birth: Date;
  created_at: Date;
  updated_at: Date;
}
