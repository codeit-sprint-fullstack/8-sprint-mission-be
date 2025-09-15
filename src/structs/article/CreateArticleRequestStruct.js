import { coerce, object, nonempty, string } from 'superstruct';

export const CreateArticleRequestStruct = object({
  title: coerce(nonempty(string()), string(), (value) => value.trim()),
  content: nonempty(string()),
});
