import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './objects/SendListWhereUniqueInput.schema';

export const SendListFindUniqueSchema = z.object({
  where: SendListWhereUniqueInputObjectSchema,
});
