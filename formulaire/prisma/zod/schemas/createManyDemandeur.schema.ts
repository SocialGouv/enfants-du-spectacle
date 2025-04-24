import { z } from 'zod';
import { DemandeurCreateManyInputObjectSchema } from './objects/DemandeurCreateManyInput.schema';

export const DemandeurCreateManySchema = z.object({
  data: z.union([
    DemandeurCreateManyInputObjectSchema,
    z.array(DemandeurCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
