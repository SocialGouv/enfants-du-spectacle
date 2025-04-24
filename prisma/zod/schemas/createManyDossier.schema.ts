import { z } from 'zod';
import { DossierCreateManyInputObjectSchema } from './objects/DossierCreateManyInput.schema';

export const DossierCreateManySchema = z.object({
  data: z.union([
    DossierCreateManyInputObjectSchema,
    z.array(DossierCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
