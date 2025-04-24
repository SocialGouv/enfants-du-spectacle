import { z } from 'zod';
import { PieceDossierCreateManyInputObjectSchema } from './objects/PieceDossierCreateManyInput.schema';

export const PieceDossierCreateManySchema = z.object({
  data: z.union([
    PieceDossierCreateManyInputObjectSchema,
    z.array(PieceDossierCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
