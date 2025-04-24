import { z } from 'zod';
import { PieceDossierEnfantWhereInputObjectSchema } from './objects/PieceDossierEnfantWhereInput.schema';

export const PieceDossierEnfantDeleteManySchema = z.object({
  where: PieceDossierEnfantWhereInputObjectSchema.optional(),
});
