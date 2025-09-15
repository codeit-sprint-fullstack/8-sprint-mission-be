import { string, integer, array, trim } from "superstruct";

export const CreateProductRequestStruct = {
  name: trim(string()),
  description: trim(string()),
  price: integer(),
  tags: array(string()),
};
