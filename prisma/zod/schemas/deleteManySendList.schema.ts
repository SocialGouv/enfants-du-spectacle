import { z } from 'zod';
import { SendListWhereInputObjectSchema } from './objects/SendListWhereInput.schema';

export const SendListDeleteManySchema = z.object({
  where: SendListWhereInputObjectSchema.optional(),
});
