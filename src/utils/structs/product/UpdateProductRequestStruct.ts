import { partial } from 'superstruct';

import { CreateProductRequestStruct } from './CreateProductRequestStruct';

export const UpdateProductRequestStruct = partial(CreateProductRequestStruct);
