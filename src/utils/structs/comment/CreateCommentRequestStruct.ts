import { nonempty, object, string } from 'superstruct';

export const CreateCommentRequestStruct = object({
    content: nonempty(string()),
});
