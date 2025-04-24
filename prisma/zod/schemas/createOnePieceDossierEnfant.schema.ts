import { z } from 'zod';
import { PieceDossierEnfantCreateInputObjectSchema } from './objects/PieceDossierEnfantCreateInput.schema';
import { PieceDossierEnfantUncheckedCreateInputObjectSchema } from './objects/PieceDossierEnfantUncheckedCreateInput.schema';

export const PieceDossierEnfantCreateOneSchema = z.object({
  data: z.union([
    PieceDossierEnfantCreateInputObjectSchema,
    PieceDossierEnfantUncheckedCreateInputObjectSchema,
  ]),
});
