import { z } from 'zod';
import { EnfantCreateManyInputObjectSchema } from './objects/EnfantCreateManyInput.schema';

export const EnfantCreateManySchema = z.object({
  data: z.union([
    EnfantCreateManyInputObjectSchema,
    z.array(EnfantCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
