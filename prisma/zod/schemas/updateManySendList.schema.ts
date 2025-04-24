import { z } from 'zod';
import { SendListUpdateManyMutationInputObjectSchema } from './objects/SendListUpdateManyMutationInput.schema';
import { SendListWhereInputObjectSchema } from './objects/SendListWhereInput.schema';

export const SendListUpdateManySchema = z.object({
  data: SendListUpdateManyMutationInputObjectSchema,
  where: SendListWhereInputObjectSchema.optional(),
});
