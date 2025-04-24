import { z } from 'zod';
import { PieceDossierEnfantCreateManyInputObjectSchema } from './objects/PieceDossierEnfantCreateManyInput.schema';

export const PieceDossierEnfantCreateManySchema = z.object({
  data: z.union([
    PieceDossierEnfantCreateManyInputObjectSchema,
    z.array(PieceDossierEnfantCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
