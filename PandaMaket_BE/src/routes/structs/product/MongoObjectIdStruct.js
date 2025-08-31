import { object, refine, string } from 'superstruct';
import { isValidObjectId } from 'mongoose';

export const MongoObjectIdStruct = object({
    productId: refine(string(), 'MongoObjectId', (value) => isValidObjectId(value)),
});
