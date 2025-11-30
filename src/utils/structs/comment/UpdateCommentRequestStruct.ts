import { partial } from 'superstruct';

import { CreateCommentRequestStruct } from './CreateCommentRequestStruct';

export const UpdateCommentRequestStruct = partial(CreateCommentRequestStruct);
