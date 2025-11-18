import {partial} from 'superstruct';

import { CreateArticleRequestStruct } from './CreateArticleRequestStruct.js';

export const UpdateArticleRequestStruct = partial(CreateArticleRequestStruct);
