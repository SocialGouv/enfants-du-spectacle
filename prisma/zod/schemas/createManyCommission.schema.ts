import { z } from 'zod';
import { CommissionCreateManyInputObjectSchema } from './objects/CommissionCreateManyInput.schema';

export const CommissionCreateManySchema = z.object({
  data: z.union([
    CommissionCreateManyInputObjectSchema,
    z.array(CommissionCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
