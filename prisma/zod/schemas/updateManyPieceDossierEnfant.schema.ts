import { z } from 'zod';
import { PieceDossierEnfantUpdateManyMutationInputObjectSchema } from './objects/PieceDossierEnfantUpdateManyMutationInput.schema';
import { PieceDossierEnfantWhereInputObjectSchema } from './objects/PieceDossierEnfantWhereInput.schema';

export const PieceDossierEnfantUpdateManySchema = z.object({
  data: PieceDossierEnfantUpdateManyMutationInputObjectSchema,
  where: PieceDossierEnfantWhereInputObjectSchema.optional(),
});
