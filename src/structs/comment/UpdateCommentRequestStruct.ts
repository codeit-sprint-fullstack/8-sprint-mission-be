import { partial } from 'superstruct';

import { CreateCommentRequestStruct } from './CreateCommentRequestStruct.js';

export const UpdateCommentRequestStruct = partial(CreateCommentRequestStruct);
