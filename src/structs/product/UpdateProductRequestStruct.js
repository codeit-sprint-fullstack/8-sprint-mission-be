import { string, integer, array, trim, optional } from "superstruct";

export const UpdateProductRequestStruct = {
  name: optional(trim(string())),
  description: optional(trim(string())),
  price: optional(integer()),
  tags: optional(array(string())),
};
