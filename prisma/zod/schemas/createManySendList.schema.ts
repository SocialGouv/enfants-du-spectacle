import { z } from 'zod';
import { SendListCreateManyInputObjectSchema } from './objects/SendListCreateManyInput.schema';

export const SendListCreateManySchema = z.object({
  data: z.union([
    SendListCreateManyInputObjectSchema,
    z.array(SendListCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
