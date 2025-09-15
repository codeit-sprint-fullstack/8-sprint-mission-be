import { coerce, object, optional, string, integer, array } from "superstruct";

export const UpdateProductRequestStruct = object({
  name: optional(coerce(string(), string(), (value) => value.trim())),
  description: optional(string()),
  price: optional(integer()),
  tags: optional(array(string())),
  images: optional(array(string())),
});
