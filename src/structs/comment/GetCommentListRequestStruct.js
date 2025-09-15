import { object, optional, defaulted, integer } from "superstruct";

export const GetCommentListRequestStruct = object({
  cursor: optional(integer()),
  take: defaulted(integer(), 10),
});
