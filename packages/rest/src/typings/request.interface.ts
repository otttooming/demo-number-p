import { Files } from "formidable";

export interface KoaRequestOverride {
  body?: any;
  files?: Files;
}
