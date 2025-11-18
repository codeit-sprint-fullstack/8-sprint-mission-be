import { partial } from 'superstruct';

import { CreateProductRequestStruct } from './CreateProductRequestStruct.js';

export const UpdateProductRequestStruct = partial(CreateProductRequestStruct);
