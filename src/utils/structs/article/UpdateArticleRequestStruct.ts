import { partial } from 'superstruct';

import { CreateArticleRequestStruct } from './CreateArticleRequestStruct';

export const UpdateArticleRequestStruct = partial(CreateArticleRequestStruct);
