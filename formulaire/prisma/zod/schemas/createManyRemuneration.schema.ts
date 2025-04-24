import { z } from 'zod';
import { RemunerationCreateManyInputObjectSchema } from './objects/RemunerationCreateManyInput.schema';

export const RemunerationCreateManySchema = z.object({
  data: z.union([
    RemunerationCreateManyInputObjectSchema,
    z.array(RemunerationCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
